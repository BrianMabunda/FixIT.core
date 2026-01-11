export const DIAGNOSTIC_MANUAL = {
  "initial": {
    message: "Neural link established. Which sector requires immediate troubleshooting?",
    options: ["Power Module", "Physical Cables", "Network Config"],
    confidence: 1.0,
    stage: "initial"
  },
  "Power Module": {
    message: "Scan the Power LED. Is it currently Solid Green, Blinking Amber, or Dark?",
    options: ["Solid Green", "Blinking Amber", "Off"],
    confidence: 0.95,
    stage: "Power"
  },
  "Physical Cables": {
    message: "Verify WAN connection. Is the primary blue cable securely locked into the port?",
    options: ["Link Secure", "Port Empty", "Cable Damaged"],
    confidence: 0.90,
    stage: "Cables"
  },
  "Network Config": {
    message: "Access system gateway at 192.168.1.1. Is the admin dashboard reachable?",
    options: ["Login Visible", "Connection Timeout"],
    confidence: 0.88,
    stage: "Configuration"
  },
  "Off": {
    message: "Power loss detected. Verify connection at the wall terminal and power adapter.",
    options: ["Terminals Checked", "Reset Required"],
    confidence: 0.85,
    stage: "Power"
  },
  "Blinking Amber": {
    message: "Firmware update in progress. Do not disconnect. Is the amber light still active?",
    options: ["Still Updating", "Update Failed"],
    confidence: 0.82,
    stage: "Power"
  }
};