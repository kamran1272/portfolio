/* Magsi Digital Command Center — mobile app config.
   Live feed: the same private Google Sheet the desktop app reads.
   The feed publishes every 30 seconds; the app polls every 30 seconds. */
window.MAGSI_CONFIG = {
  dataUrl: "https://docs.google.com/spreadsheets/d/1Z5oq_e3TfwztMF8n3SDFaAE3NVeFClRXZqEHDCKwdxY/gviz/tq?tqx=out:json&headers=0&range=A1:A20",
  pollMs: 30000,
  appName: "Magsi Command Center",
  version: "1.3.2"
};
