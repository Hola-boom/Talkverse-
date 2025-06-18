let localStream; const servers = { iceServers: [ { urls: "stun:stun.l.google.com:19302" }, ], };

let peerConnections = {};

async function startCall(groupMembers) { localStream = await navigator.mediaDevices.getUserMedia({ audio: true }); document.getElementById("call-status").innerText = "Calling...";

groupMembers.forEach((memberId) => { if (memberId === auth.currentUser.uid) return;

const pc = new RTCPeerConnection(servers);
peerConnections[memberId] = pc;

localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

pc.onicecandidate = (event) => {
  if (event.candidate) {
    db.collection("calls").doc(memberId).collection("candidates").add({
      from: auth.currentUser.uid,
      candidate: event.candidate.toJSON(),
    });
  }
};

pc.createOffer().then((offer) => {
  pc.setLocalDescription(offer);
  db.collection("calls").doc(memberId).set({
    from: auth.currentUser.uid,
    offer: offer.toJSON(),
  });
});

}); }

function listenForCalls() { db.collection("calls").doc(auth.currentUser.uid).onSnapshot((doc) => { if (!doc.exists || !doc.data().offer) return;

const offer = doc.data().offer;
const from = doc.data().from;
const pc = new RTCPeerConnection(servers);
peerConnections[from] = pc;

pc.ontrack = (event) => {
  const audio = document.createElement("audio");
  audio.srcObject = event.streams[0];
  audio.autoplay = true;
  document.body.appendChild(audio);
};

pc.onicecandidate = (event) => {
  if (event.candidate) {
    db.collection("calls").doc(from).collection("candidates").add({
      from: auth.currentUser.uid,
      candidate: event.candidate.toJSON(),
    });
  }
};

pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}).then((stream) => {
  localStream = stream;
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  return pc.createAnswer();
}).then((answer) => {
  return pc.setLocalDescription(answer);
}).then(() => {
  db.collection("calls").doc(from).update({
    answer: pc.localDescription.toJSON(),
  });
});

}); }

function endCall() { Object.values(peerConnections).forEach((pc) => pc.close()); peerConnections = {}; document.getElementById("call-status").innerText = "Call ended"; }

