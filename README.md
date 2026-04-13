<!-- markdownlint-disable first-line-heading -->
<!-- markdownlint-disable fenced-code-language -->
<!-- markdownlint-disable no-inline-html -->

[![GitHub Release](https://img.shields.io/github/release/Lauferek2007/advanced-camera-card-mini-.svg?style=flat-square)](https://github.com/Lauferek2007/advanced-camera-card-mini-/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Lauferek2007/advanced-camera-card-mini-/build.yml?style=flat-square)](https://github.com/Lauferek2007/advanced-camera-card-mini-/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/dermotduffy/advanced-camera-card.svg?style=flat-square)](LICENSE)
[![HACS](https://img.shields.io/badge/HACS-default-orange.svg?style=flat-square)](https://hacs.xyz)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86&style=flat-square)](https://github.com/sponsors/dermotduffy)

<img src="https://raw.githubusercontent.com/dermotduffy/advanced-camera-card/main/docs/images/advanced-camera-card.png" alt="Advanced Camera Card Mini" width="500px">

# Advanced Camera Card Mini

A lightweight, drop-in fork of `advanced-camera-card` tuned for weaker tablets and other lower-end devices.

This fork keeps the same Lovelace card type, but changes the defaults to favor lower CPU, lower memory use and fewer background requests.

## Mini defaults

- Live view stays the primary path.
- Thumbnail rails are disabled by default.
- Zoom, wheel gestures and PTZ overlays are disabled by default.
- Status bar and most media/gallery menu buttons are hidden by default.
- Single-camera live view bypasses the carousel wrapper.
- `auto` live provider no longer falls back to JSMPEG.
- Image fallback refreshes less aggressively.
- Loading effects and decorative styling are reduced.

## Variants

## HACS

Add this repository in HACS as:

- Type: `Dashboard`

HACS will use:

```text
/hacsfiles/advanced-camera-card-mini-/advanced-camera-card-mini-.js
```

### `advanced-camera-card.js`

The default `mini` fork.

Use with:

```yaml
type: custom:advanced-camera-card
```

### `advanced-camera-card-ultra.js`

A more aggressively cut live-only variant. It forces the card into a single live pane, disables non-live capability paths, hides most UI and keeps only the bare minimum menu for camera switching and fullscreen.

Use with:

```yaml
type: custom:advanced-camera-card-ultra
```

## Goal

The goal is not feature parity at all costs. The goal is a card that degrades gracefully on weaker hardware and stays usable before it becomes fancy.
