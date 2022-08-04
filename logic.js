onmessage = (e) => {
    self.postMessage(JSON.stringify(JSON.parse(e.data)));
}