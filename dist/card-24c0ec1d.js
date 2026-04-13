import { i as isTruthy, l as localize, c as createGeneralAction, a as createViewAction, b as createCameraAction, g as getStreamCameraID, h as hasSubstream, d as isViewSupportedByCamera, V as ViewItemClassifier, e as isBeingCasted, f as getEntityTitle, j as createMediaPlayerAction, k as getCameraIDsForViewName, m as createDisplayModeAction, n as getPTZTarget, o as createPTZControlsAction, p as createPTZMultiAction, Q as QueryClassifier, q as arrayify, r as isAdvancedCameraCardCustomAction, s as VIEWS_USER_SPECIFIED, _ as __decorate, t, u as s, v as r, w as fireAdvancedCameraCardEvent, A as AdvancedCameraCardError, x as r$1, y as n, T as TemplateRenderer, z as isEqual, B as errorToConsole, C as x, D as ConditionsManager, E as Timer, F as orderBy, G as getActionConfigGivenAction, H as dispatchActionExecutionRequest, I as setOrRemoveAttribute, S as STATUS_BAR_PRIORITY_DEFAULT, J as e, K as actionHandler, L as hasAction, M as stopEventFromActivatingCardWideActions, N as ViewFolder, O as prettifyTitle, P as getDurationString, R as format, U as createFetchThumbnailTask, W as i, X as renderTask, Y as e$1, Z as isHoverableDevice, $ as getChildrenFromElement, a0 as n$1, a1 as contentsChanged, a2 as css$d, a3 as getDiagnostics, a4 as renderMessage, a5 as getReleaseVersion, a6 as REPO_URL, a7 as CardController, a8 as o, a9 as o$1, aa as css$e } from './card-edc26888.js';
import { m } from './until-cbe9e5ec.js';

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth = 20, depth = 0) {
    let matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    const traverseSlot = ($slot) => {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const assignedNodes = $slot.assignedNodes().filter(node => node.nodeType === 1);
        if (assignedNodes.length > 0) {
            return queryShadowRoot(assignedNodes[0].parentElement, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    const children = Array.from(root.children || []);
    for (const $child of children) {
        // Check if the node and its descendants should be skipped
        if (skipNode($child)) {
            continue;
        }
        // If the child matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            matches.push(...queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            matches.push(...traverseSlot($child));
        }
        else {
            matches.push(...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}

/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return $elem.hasAttribute("hidden")
        || ($elem.hasAttribute("aria-hidden") && $elem.getAttribute("aria-hidden") !== "false")
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        || $elem.style.display === `none`
        || $elem.style.opacity === `0`
        || $elem.style.visibility === `hidden`
        || $elem.style.visibility === `collapse`;
    // If offsetParent is null we can assume that the element is hidden
    // https://stackoverflow.com/questions/306305/what-would-make-offsetparent-null
    //|| $elem.offsetParent == null;
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return $elem.hasAttribute("disabled")
        || ($elem.hasAttribute("aria-disabled") && $elem.getAttribute("aria-disabled") !== "false");
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" || isHidden($elem) || isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex")
        // Anchor tags or area tags with a href set
        || ($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) && $elem.hasAttribute("href")
        // Form elements which are not disabled
        || ($elem instanceof HTMLButtonElement
            || $elem instanceof HTMLInputElement
            || $elem instanceof HTMLTextAreaElement
            || $elem instanceof HTMLSelectElement)
        // IFrames
        || $elem instanceof HTMLIFrameElement);
}

const timeouts = new Map();
/**
 * Debounces a callback.
 * @param cb
 * @param ms
 * @param id
 */
function debounce(cb, ms, id) {
    // Clear current timeout for id
    const timeout = timeouts.get(id);
    if (timeout != null) {
        window.clearTimeout(timeout);
    }
    // Set new timeout
    timeouts.set(id, window.setTimeout(() => {
        cb();
        timeouts.delete(id);
    }, ms));
}

/**
 * Template for the focus trap.
 */
const template$2 = document.createElement("template");
template$2.innerHTML = `
	<div id="start"></div>
	<div id="backup"></div>
	<slot></slot>
	<div id="end"></div>
`;
/**
 * Focus trap web component.
 * @customElement focus-trap
 * @slot - Default content.
 */
class FocusTrap extends HTMLElement {
    /**
     * Attaches the shadow root.
     */
    constructor() {
        super();
        // The debounce id is used to distinguish this focus trap from others when debouncing
        this.debounceId = Math.random().toString();
        this._focused = false;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template$2.content.cloneNode(true));
        this.$backup = shadow.querySelector("#backup");
        this.$start = shadow.querySelector("#start");
        this.$end = shadow.querySelector("#end");
        this.focusLastElement = this.focusLastElement.bind(this);
        this.focusFirstElement = this.focusFirstElement.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }
    // Whenever one of these attributes changes we need to render the template again.
    static get observedAttributes() {
        return [
            "inactive"
        ];
    }
    /**
     * Determines whether the focus trap is active or not.
     * @attr
     */
    get inactive() {
        return this.hasAttribute("inactive");
    }
    set inactive(value) {
        value ? this.setAttribute("inactive", "") : this.removeAttribute("inactive");
    }
    /**
     * Returns whether the element currently has focus.
     */
    get focused() {
        return this._focused;
    }
    /**
     * Hooks up the element.
     */
    connectedCallback() {
        this.$start.addEventListener("focus", this.focusLastElement);
        this.$end.addEventListener("focus", this.focusFirstElement);
        // Focus out is called every time the user tabs around inside the element
        this.addEventListener("focusin", this.onFocusIn);
        this.addEventListener("focusout", this.onFocusOut);
        this.render();
    }
    /**
     * Tears down the element.
     */
    disconnectedCallback() {
        this.$start.removeEventListener("focus", this.focusLastElement);
        this.$end.removeEventListener("focus", this.focusFirstElement);
        this.removeEventListener("focusin", this.onFocusIn);
        this.removeEventListener("focusout", this.onFocusOut);
    }
    /**
     * When the attributes changes we need to re-render the template.
     */
    attributeChangedCallback() {
        this.render();
    }
    /**
     * Focuses the first focusable element in the focus trap.
     */
    focusFirstElement() {
        this.trapFocus();
    }
    /**
     * Focuses the last focusable element in the focus trap.
     */
    focusLastElement() {
        this.trapFocus(true);
    }
    /**
     * Returns a list of the focusable children found within the element.
     */
    getFocusableElements() {
        return queryShadowRoot(this, isHidden, isFocusable);
    }
    /**
     * Focuses on either the last or first focusable element.
     * @param {boolean} trapToEnd
     */
    trapFocus(trapToEnd) {
        if (this.inactive)
            return;
        let focusableChildren = this.getFocusableElements();
        if (focusableChildren.length > 0) {
            if (trapToEnd) {
                focusableChildren[focusableChildren.length - 1].focus();
            }
            else {
                focusableChildren[0].focus();
            }
            this.$backup.setAttribute("tabindex", "-1");
        }
        else {
            // If there are no focusable children we need to focus on the backup
            // to trap the focus. This is a useful behavior if the focus trap is
            // for example used in a dialog and we don't want the user to tab
            // outside the dialog even though there are no focusable children
            // in the dialog.
            this.$backup.setAttribute("tabindex", "0");
            this.$backup.focus();
        }
    }
    /**
     * When the element gains focus this function is called.
     */
    onFocusIn() {
        this.updateFocused(true);
    }
    /**
     * When the element looses its focus this function is called.
     */
    onFocusOut() {
        this.updateFocused(false);
    }
    /**
     * Updates the focused property and updates the view.
     * The update is debounced because the focusin and focusout out
     * might fire multiple times in a row. We only want to render
     * the element once, therefore waiting until the focus is "stable".
     * @param value
     */
    updateFocused(value) {
        debounce(() => {
            if (this.focused !== value) {
                this._focused = value;
                this.render();
            }
        }, 0, this.debounceId);
    }
    /**
     * Updates the template.
     */
    render() {
        this.$start.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.$end.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.focused ? this.setAttribute("focused", "") : this.removeAttribute("focused");
    }
}
window.customElements.define("focus-trap", FocusTrap);

/**
 * Returns the data dialog count for an element.
 * @param $elem
 */
function getDialogCount($elem) {
    return Number($elem.getAttribute(`data-dialog-count`)) || 0;
}
/**
 * Sets the data dialog count for an element.
 * @param $elem
 * @param count
 */
function setDialogCount($elem, count) {
    $elem.setAttribute(`data-dialog-count`, count.toString());
}
/**
 * Traverses the tree of active elements down the shadow tree.
 * @param activeElement
 */
function traverseActiveElements(activeElement = document.activeElement) {
    if (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
        return traverseActiveElements(activeElement.shadowRoot.activeElement);
    }
    return activeElement;
}

var styles = `*{box-sizing:border-box}:host{padding:var(--dialog-container-padding,5vw 24px);z-index:var(--dialog-z-index,12345678);outline:none}#backdrop,:host{position:fixed;top:0;left:0;bottom:0;right:0}:host,:host([center]) #dialog{overflow-x:var(--dialog-overflow-x,hidden);overflow-y:var(--dialog-overflow-y,auto);overscroll-behavior:contain;-webkit-overflow-scrolling:touch}:host([center]){display:flex;align-items:center;justify-content:center;overflow:hidden}:host([center]) #dialog{max-height:var(--dialog-max-height,100%)}:host(:not(:defined)),:host(:not([open])){display:none}#backdrop{background:var(--dialog-backdrop-bg,rgba(0,0,0,.6));animation:fadeIn var(--dialog-animation-duration,.1s) var(--dialog-animation-easing,ease-out);z-index:-1}#dialog{animation:scaleIn var(--dialog-animation-duration,.1s) var(--dialog-animation-easing,ease-out);border-radius:var(--dialog-border-radius,12px);box-shadow:var(--dialog-box-shadow,0 2px 10px -5px rgba(0,0,0,.6));max-width:var(--dialog-max-width,700px);width:var(--dialog-width,100%);padding:var(--dialog-padding,24px);max-height:var(--dialog-max-height,unset);height:var(--dialog-height,auto);color:var(--dialog-color,currentColor);background:var(--dialog-bg,#fff);z-index:1;position:relative;display:flex;flex-direction:column;margin:0 auto;border:none}::slotted(article),article{flex-grow:1;overflow-y:auto;-webkit-overflow-scrolling:touch}::slotted(footer),::slotted(header),footer,header{flex-shrink:0}@keyframes scaleIn{0%{transform:scale(.9) translateY(30px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}`;

const template$1 = document.createElement("template");
template$1.innerHTML = `
  <style>${styles}</style>
  <div id="backdrop" part="backdrop"></div>
  <focus-trap id="dialog" part="dialog">
    <slot></slot>
  </focus-trap>
`;
/**
 * A dialog web component that can be used to display highly interruptive messages.
 * @fires open - This event is fired when the dialog opens.
 * @fires close - This event is fired when the dialog closes.
 * @fires closing - This event is fired before the dialog is closed by clicking escape or on the backdrop. The event is cancellable which means `event.preventDefault()` can cancel the closing of the dialog.
 * @cssprop --dialog-container-padding - Padding of the host container of the dialog.
 * @cssprop --dialog-z-index - Z-index of the dialog.
 * @cssprop --dialog-overflow-x - Overflow of the x-axis.
 * @cssprop --dialog-overflow-y - Overflow of the y-axis.
 * @cssprop --dialog-max-height - Max height of the dialog.
 * @cssprop --dialog-height - Height of the dialog.
 * @cssprop --dialog-backdrop-bg - Background of the backdrop.
 * @cssprop --dialog-animation-duration - Duration of the dialog animation.
 * @cssprop --dialog-animation-easing - Easing of the dialog animation.
 * @cssprop --dialog-border-radius - Border radius of the dialog.
 * @cssprop --dialog-box-shadow - Box shadow of the dialog.
 * @cssprop --dialog-max-width - Max width of the dialog.
 * @cssprop --dialog-width - Width of the dialog.
 * @cssprop --dialog-padding - Padding of the dialog.
 * @cssprop --dialog-color - Color of the dialog.
 * @cssprop --dialog-bg - Background of the dialog.
 * @csspart backdrop - Backdrop part.
 * @csspart dialog - Dialog part.
 */
class WebDialog extends HTMLElement {
    /**
     * Attaches the shadow root.
     */
    constructor() {
        super();
        this.$scrollContainer = document.documentElement;
        this.$previousActiveElement = null;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template$1.content.cloneNode(true));
        this.$dialog = shadow.querySelector("#dialog");
        this.$backdrop = shadow.querySelector("#backdrop");
        this.onBackdropClick = this.onBackdropClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        // Set aria attributes
        this.setAttribute("aria-modal", "true");
        this.$dialog.setAttribute("role", "alertdialog");
    }
    static get observedAttributes() {
        return ["open", "center"];
    }
    /**
     * Whether the dialog is opened.
     * @attr
     */
    get open() {
        return this.hasAttribute("open");
    }
    set open(value) {
        value ? this.setAttribute("open", "") : this.removeAttribute("open");
    }
    /**
     * Whether the dialog is centered on the page.
     * @attr
     */
    get center() {
        return this.hasAttribute("center");
    }
    set center(value) {
        value ? this.setAttribute("center", "") : this.removeAttribute("center");
    }
    /**
     * Attaches event listeners when connected.
     */
    connectedCallback() {
        this.$backdrop.addEventListener("click", this.onBackdropClick);
    }
    /**
     * Removes event listeners when disconnected.
     */
    disconnectedCallback() {
        this.$backdrop.removeEventListener("click", this.onBackdropClick);
        // If the dialog is open when it is removed from the DOM
        // we need to cleanup the event listeners and side effects.
        if (this.open) {
            this.didClose();
        }
    }
    /**
     * Shows the dialog.
     */
    show() {
        this.open = true;
    }
    /**
     * Closes the dialog with a result.
     * @param result
     */
    close(result) {
        this.result = result;
        this.open = false;
    }
    /**
     * Closes the dialog when the backdrop is clicked.
     */
    onBackdropClick() {
        if (this.assertClosing()) {
            this.close();
        }
    }
    /**
     * Closes the dialog when escape is pressed.
     */
    onKeyDown(e) {
        switch (e.code) {
            case "Escape":
                if (this.assertClosing()) {
                    this.close();
                    // If there are more dialogs, we don't want to close those also :-)
                    e.stopImmediatePropagation();
                }
                break;
        }
    }
    /**
     * Dispatches an event that, if asserts whether the dialog can be closed.
     * If "preventDefault()" is called on the event, assertClosing will return true
     * if the event was not cancelled. It will return false if the event was cancelled.
     */
    assertClosing() {
        return this.dispatchEvent(new CustomEvent("closing", { cancelable: true }));
    }
    /**
     * Setup the dialog after it has opened.
     */
    didOpen() {
        // Save the current active element so we have a way of restoring the focus when the dialog is closed.
        this.$previousActiveElement = traverseActiveElements(document.activeElement);
        // Focus the first element in the focus trap.
        // Wait for the dialog to show its content before we try to focus inside it.
        // We request an animation frame to make sure the content is now visible.
        requestAnimationFrame(() => {
            this.$dialog.focusFirstElement();
        });
        // Make the dialog focusable
        this.tabIndex = 0;
        // Block the scrolling on the scroll container to avoid the outside content to scroll.
        this.$scrollContainer.style.overflow = `hidden`;
        // Listen for key down events to close the dialog when escape is pressed.
        this.addEventListener("keydown", this.onKeyDown, { capture: true, passive: true });
        // Increment the dialog count with one to keep track of how many dialogs are currently nested.
        setDialogCount(this.$scrollContainer, getDialogCount(this.$scrollContainer) + 1);
        // Dispatch an event so the rest of the world knows the dialog opened.
        this.dispatchEvent(new CustomEvent("open"));
    }
    /**
     * Clean up the dialog after it has closed.
     */
    didClose() {
        // Remove the listener listening for key events
        this.removeEventListener("keydown", this.onKeyDown, { capture: true });
        // Decrement the dialog count with one to keep track of how many dialogs are currently nested.
        setDialogCount(this.$scrollContainer, Math.max(0, getDialogCount(this.$scrollContainer) - 1));
        // If there are now 0 active dialogs we unblock the scrolling from the scroll container.
        // This is because we know that no other dialogs are currently nested within the scroll container.
        if (getDialogCount(this.$scrollContainer) <= 0) {
            this.$scrollContainer.style.overflow = ``;
        }
        // Make the dialog unfocusable.
        this.tabIndex = -1;
        // Restore previous active element.
        if (this.$previousActiveElement != null) {
            this.$previousActiveElement.focus();
            this.$previousActiveElement = null;
        }
        // Dispatch an event so the rest of the world knows the dialog closed.
        // If a result has been set, the result is added to the detail property of the event.
        this.dispatchEvent(new CustomEvent("close", { detail: this.result }));
    }
    /**
     * Reacts when an observed attribute changes.
     */
    attributeChangedCallback(name, newValue, oldValue) {
        switch (name) {
            case "open":
                this.open ? this.didOpen() : this.didClose();
                break;
        }
    }
}
customElements.define("web-dialog", WebDialog);

class MenuButtonController {
    constructor() {
        // Array of dynamic menu buttons to be added to menu.
        this._dynamicMenuButtons = [];
    }
    addDynamicMenuButton(button) {
        if (!this._dynamicMenuButtons.includes(button)) {
            this._dynamicMenuButtons.push(button);
        }
    }
    removeDynamicMenuButton(button) {
        this._dynamicMenuButtons = this._dynamicMenuButtons.filter((existingButton) => existingButton != button);
    }
    /**
     * Get the menu buttons to display.
     * @returns An array of menu buttons.
     */
    calculateButtons(hass, config, cameraManager, foldersManager, options) {
        return [
            this._getIrisButton(config),
            this._getCamerasButton(config, cameraManager, options?.view),
            this._getSubstreamsButton(config, cameraManager, options?.view),
            this._getLiveButton(config, cameraManager, foldersManager, options?.view),
            this._getClipsButton(config, cameraManager, foldersManager, options?.view),
            this._getSnapshotsButton(config, cameraManager, foldersManager, options?.view),
            this._getRecordingsButton(config, cameraManager, foldersManager, options?.view),
            this._getImageButton(config, cameraManager, foldersManager, options?.view),
            this._getTimelineButton(config, cameraManager, foldersManager, options?.view),
            this._getDownloadButton(config, cameraManager, options?.view),
            this._getCameraUIButton(config, options?.showCameraUIButton),
            this._getMicrophoneButton(config, cameraManager, options?.view, options?.microphoneManager),
            this._getExpandButton(config, options?.inExpandedMode),
            this._getFullscreenButton(config, options?.fullscreenManager),
            this._getCastButton(hass, config, cameraManager, options?.view, options?.mediaPlayerController),
            this._getPlayPauseButton(config, options?.currentMediaLoadedInfo),
            this._getMuteUnmuteButton(config, options?.currentMediaLoadedInfo),
            this._getScreenshotButton(config, options?.currentMediaLoadedInfo),
            this._getDisplayModeButton(config, cameraManager, foldersManager, options?.view),
            this._getPTZControlsButton(config, cameraManager, options?.view),
            this._getPTZHomeButton(config, cameraManager, options?.view),
            this._getFoldersButton(config, foldersManager, options?.view),
            ...this._dynamicMenuButtons.map((button) => ({
                style: this._getStyleFromActions(config, button, options),
                ...button,
            })),
        ].filter(isTruthy);
    }
    _getIrisButton(config) {
        return {
            icon: 'iris',
            ...config.menu.buttons.iris,
            type: 'custom:advanced-camera-card-menu-icon',
            title: localize('config.menu.buttons.iris'),
            // The default button always shows regardless of whether the menu is
            // hidden or not.
            permanent: true,
            tap_action: config.menu?.style === 'hidden'
                ? createGeneralAction('menu_toggle')
                : createGeneralAction('default'),
            hold_action: createViewAction('diagnostics'),
        };
    }
    _getCamerasButton(config, cameraManager, view) {
        // Show all cameras in the menu rather than just cameras that support the
        // current view for a less surprising UX.
        const menuCameraIDs = cameraManager.getStore().getCameraIDsWithCapability('menu');
        if (menuCameraIDs.size > 1) {
            const submenuItems = Array.from(menuCameraIDs, (cameraID) => {
                const action = createCameraAction('camera_select', cameraID);
                const metadata = cameraManager.getCameraMetadata(cameraID);
                return {
                    enabled: true,
                    icon: metadata?.icon.icon,
                    entity: metadata?.icon.entity,
                    state_color: true,
                    title: metadata?.title,
                    selected: view?.camera === cameraID,
                    ...(action && { tap_action: action }),
                };
            });
            return {
                icon: 'mdi:video-switch',
                ...config.menu.buttons.cameras,
                type: 'custom:advanced-camera-card-menu-submenu',
                title: localize('config.menu.buttons.cameras'),
                items: submenuItems,
            };
        }
        return null;
    }
    _getSubstreamsButton(config, cameraManager, view) {
        if (!view) {
            return null;
        }
        const substreamCameraIDs = cameraManager
            .getStore()
            .getAllDependentCameras(view.camera, 'substream');
        if (substreamCameraIDs.size && view.is('live')) {
            const substreams = [...substreamCameraIDs].filter((cameraID) => cameraID !== view.camera);
            const streams = [view.camera, ...substreams];
            const substreamAwareCameraID = getStreamCameraID(view);
            if (streams.length === 2) {
                // If there are only two dependencies (the main camera, and 1 other)
                // then use a button not a menu to toggle.
                return {
                    icon: 'mdi:video-input-component',
                    style: substreamAwareCameraID !== view.camera ? this._getEmphasizedStyle() : {},
                    title: localize('config.menu.buttons.substreams'),
                    ...config.menu.buttons.substreams,
                    type: 'custom:advanced-camera-card-menu-icon',
                    tap_action: createGeneralAction(hasSubstream(view) ? 'live_substream_off' : 'live_substream_on'),
                };
            }
            else if (streams.length > 2) {
                const menuItems = Array.from(streams, (streamID) => {
                    const action = createCameraAction('live_substream_select', streamID);
                    const metadata = cameraManager.getCameraMetadata(streamID) ?? undefined;
                    return {
                        enabled: true,
                        icon: metadata?.icon.icon,
                        entity: metadata?.icon.entity,
                        state_color: true,
                        title: metadata?.title,
                        selected: substreamAwareCameraID === streamID,
                        ...(action && { tap_action: action }),
                    };
                });
                return {
                    icon: 'mdi:video-input-component',
                    title: localize('config.menu.buttons.substreams'),
                    style: substreamAwareCameraID !== view.camera ? this._getEmphasizedStyle() : {},
                    ...config.menu.buttons.substreams,
                    type: 'custom:advanced-camera-card-menu-submenu',
                    items: menuItems,
                };
            }
        }
        return null;
    }
    _getLiveButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('live', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:cctv',
                ...config.menu.buttons.live,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.live'),
                style: view.is('live') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('live'),
            }
            : null;
    }
    _getClipsButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('clips', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:filmstrip',
                ...config.menu.buttons.clips,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.clips'),
                style: view?.is('clips') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('clips'),
                hold_action: createViewAction('clip'),
            }
            : null;
    }
    _getSnapshotsButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('snapshots', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:camera',
                ...config.menu.buttons.snapshots,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.snapshots'),
                style: view?.is('snapshots') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('snapshots'),
                hold_action: createViewAction('snapshot'),
            }
            : null;
    }
    _getRecordingsButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('recordings', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:album',
                ...config.menu.buttons.recordings,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.recordings'),
                style: view.is('recordings') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('recordings'),
                hold_action: createViewAction('recording'),
            }
            : null;
    }
    _getImageButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('image', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:image',
                ...config.menu.buttons.image,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.image'),
                style: view?.is('image') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('image'),
            }
            : null;
    }
    _getTimelineButton(config, cameraManager, foldersManager, view) {
        return view &&
            isViewSupportedByCamera('timeline', cameraManager, foldersManager, view.camera)
            ? {
                icon: 'mdi:chart-gantt',
                ...config.menu.buttons.timeline,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.view.views.timeline'),
                style: view.is('timeline') ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('timeline'),
            }
            : null;
    }
    _getDownloadButton(config, cameraManager, view) {
        const selectedItem = view?.queryResults?.getSelectedResult();
        const mediaCapabilities = selectedItem && ViewItemClassifier.isMedia(selectedItem)
            ? cameraManager?.getMediaCapabilities(selectedItem)
            : null;
        if (view?.isViewerView() && mediaCapabilities?.canDownload && !isBeingCasted()) {
            return {
                icon: 'mdi:download',
                ...config.menu.buttons.download,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.download'),
                tap_action: createGeneralAction('download'),
            };
        }
        return null;
    }
    _getCameraUIButton(config, showCameraUIButton) {
        return showCameraUIButton
            ? {
                icon: 'mdi:web',
                ...config.menu.buttons.camera_ui,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.camera_ui'),
                tap_action: createGeneralAction('camera_ui'),
            }
            : null;
    }
    _getMicrophoneButton(config, cameraManager, view, microphoneManager) {
        if (!view) {
            return null;
        }
        const capabilities = cameraManager.getCameraCapabilities(getStreamCameraID(view));
        if (microphoneManager && capabilities?.has('2-way-audio')) {
            const unavailable = microphoneManager.isForbidden() || !microphoneManager.isSupported();
            const muted = microphoneManager.isMuted();
            const buttonType = config.menu.buttons.microphone.type;
            return {
                icon: unavailable
                    ? 'mdi:microphone-message-off'
                    : muted
                        ? 'mdi:microphone-off'
                        : 'mdi:microphone',
                ...config.menu.buttons.microphone,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.microphone'),
                style: unavailable || muted ? {} : this._getEmphasizedStyle(true),
                ...(!unavailable &&
                    buttonType === 'momentary' && {
                    start_tap_action: createGeneralAction('microphone_unmute'),
                    end_tap_action: createGeneralAction('microphone_mute'),
                }),
                ...(!unavailable &&
                    buttonType === 'toggle' && {
                    tap_action: createGeneralAction(muted ? 'microphone_unmute' : 'microphone_mute'),
                }),
            };
        }
        return null;
    }
    _getExpandButton(config, inExpandedMode) {
        return {
            icon: inExpandedMode ? 'mdi:arrow-collapse-all' : 'mdi:arrow-expand-all',
            ...config.menu.buttons.expand,
            type: 'custom:advanced-camera-card-menu-icon',
            title: localize('config.menu.buttons.expand'),
            tap_action: createGeneralAction('expand'),
            style: inExpandedMode ? this._getEmphasizedStyle() : {},
        };
    }
    _getFullscreenButton(config, fullscreenManager) {
        const inFullscreen = fullscreenManager?.isInFullscreen();
        return fullscreenManager?.isSupported()
            ? {
                icon: inFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen',
                ...config.menu.buttons.fullscreen,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.fullscreen'),
                tap_action: createGeneralAction('fullscreen'),
                style: inFullscreen ? this._getEmphasizedStyle() : {},
            }
            : null;
    }
    _getCastButton(hass, config, cameraManager, view, mediaPlayerController) {
        if (!view) {
            return null;
        }
        const selectedCameraConfig = cameraManager.getStore().getCameraConfig(view.camera);
        if (mediaPlayerController?.hasMediaPlayers() &&
            (view.isViewerView() || (view.is('live') && selectedCameraConfig?.camera_entity))) {
            const mediaPlayerItems = mediaPlayerController
                .getMediaPlayers()
                .map((playerEntityID) => {
                const title = getEntityTitle(hass, playerEntityID) || playerEntityID;
                const state = hass.states[playerEntityID];
                const playAction = createMediaPlayerAction(playerEntityID, 'play');
                const stopAction = createMediaPlayerAction(playerEntityID, 'stop');
                const disabled = !state || state.state === 'unavailable';
                return {
                    enabled: true,
                    selected: false,
                    entity: playerEntityID,
                    state_color: false,
                    title: title,
                    disabled: disabled,
                    ...(!disabled && playAction && { tap_action: playAction }),
                    ...(!disabled && stopAction && { hold_action: stopAction }),
                };
            });
            return {
                icon: 'mdi:cast',
                ...config.menu.buttons.media_player,
                type: 'custom:advanced-camera-card-menu-submenu',
                title: localize('config.menu.buttons.media_player'),
                items: mediaPlayerItems,
            };
        }
        return null;
    }
    _getPlayPauseButton(config, currentMediaLoadedInfo) {
        if (currentMediaLoadedInfo &&
            currentMediaLoadedInfo.mediaPlayerController &&
            currentMediaLoadedInfo.capabilities?.supportsPause) {
            const paused = currentMediaLoadedInfo.mediaPlayerController?.isPaused();
            return {
                icon: paused ? 'mdi:play' : 'mdi:pause',
                ...config.menu.buttons.play,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.play'),
                tap_action: createGeneralAction(paused ? 'play' : 'pause'),
            };
        }
        return null;
    }
    _getMuteUnmuteButton(config, currentMediaLoadedInfo) {
        if (currentMediaLoadedInfo &&
            currentMediaLoadedInfo.mediaPlayerController &&
            currentMediaLoadedInfo?.capabilities?.hasAudio) {
            const muted = currentMediaLoadedInfo.mediaPlayerController?.isMuted();
            return {
                icon: muted ? 'mdi:volume-off' : 'mdi:volume-high',
                ...config.menu.buttons.mute,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.mute'),
                tap_action: createGeneralAction(muted ? 'unmute' : 'mute'),
            };
        }
        return null;
    }
    _getScreenshotButton(config, currentMediaLoadedInfo) {
        if (currentMediaLoadedInfo && currentMediaLoadedInfo.mediaPlayerController) {
            return {
                icon: 'mdi:monitor-screenshot',
                ...config.menu.buttons.screenshot,
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.screenshot'),
                tap_action: createGeneralAction('screenshot'),
            };
        }
        return null;
    }
    _getDisplayModeButton(config, cameraManager, foldersManager, view) {
        const viewCameraIDs = view
            ? getCameraIDsForViewName(view.view, cameraManager, foldersManager)
            : null;
        if (view?.supportsMultipleDisplayModes() &&
            viewCameraIDs &&
            viewCameraIDs.size > 1) {
            const isGrid = view.isGrid();
            return {
                icon: isGrid ? 'mdi:grid-off' : 'mdi:grid',
                ...config.menu.buttons.display_mode,
                style: isGrid ? this._getEmphasizedStyle() : {},
                type: 'custom:advanced-camera-card-menu-icon',
                title: isGrid
                    ? localize('display_modes.single')
                    : localize('display_modes.grid'),
                tap_action: createDisplayModeAction(isGrid ? 'single' : 'grid'),
            };
        }
        return null;
    }
    _getPTZControlsButton(config, cameraManager, view) {
        const ptzConfig = view?.is('live')
            ? config.live.controls.ptz
            : view?.isViewerView()
                ? config.media_viewer.controls.ptz
                : null;
        if (!view || !ptzConfig) {
            return null;
        }
        const ptzTarget = getPTZTarget(view, {
            cameraManager: cameraManager,
        });
        if (ptzTarget) {
            const isOn = view.context?.ptzControls?.enabled !== undefined
                ? view.context.ptzControls.enabled
                : ptzConfig.mode === 'on' ||
                    (ptzConfig.mode === 'auto' && ptzTarget.type === 'ptz');
            return {
                icon: 'mdi:pan',
                ...config.menu.buttons.ptz_controls,
                style: isOn ? this._getEmphasizedStyle() : {},
                type: 'custom:advanced-camera-card-menu-icon',
                title: localize('config.menu.buttons.ptz_controls'),
                tap_action: createPTZControlsAction(!isOn),
            };
        }
        return null;
    }
    _getPTZHomeButton(config, cameraManager, view) {
        const target = view
            ? getPTZTarget(view, {
                cameraManager: cameraManager,
            })
            : null;
        if (!target ||
            ((target.type === 'digital' &&
                view?.context?.zoom?.[target.targetID]?.observed?.isDefault) ??
                true)) {
            return null;
        }
        return {
            icon: 'mdi:home',
            ...config.menu.buttons.ptz_home,
            type: 'custom:advanced-camera-card-menu-icon',
            title: localize('config.menu.buttons.ptz_home'),
            tap_action: createPTZMultiAction({
                targetID: target.targetID,
            }),
        };
    }
    _getFoldersButton(config, foldersManager, view) {
        const folders = [...(foldersManager?.getFolders() ?? [])];
        if (!folders?.length) {
            return null;
        }
        if (folders.length === 1) {
            const isSelected = QueryClassifier.isFolderQuery(view?.query) &&
                view.query.getQuery()?.folder.id === folders[0][0];
            const folder = folders[0][1];
            return {
                icon: folder.icon ?? 'mdi:folder',
                ...config.menu.buttons.folders,
                type: 'custom:advanced-camera-card-menu-icon',
                title: folder.title ?? localize('config.menu.buttons.folders'),
                style: isSelected ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('folders'),
                hold_action: createViewAction('folder'),
            };
        }
        const submenuItems = folders.map(([id, folder]) => {
            const isSelected = QueryClassifier.isFolderQuery(view?.query) &&
                view.query.getQuery()?.folder.id === id;
            return {
                enabled: true,
                title: folder.title ?? folder.id,
                icon: folder.icon ?? 'mdi:folder',
                selected: isSelected,
                style: isSelected ? this._getEmphasizedStyle() : {},
                tap_action: createViewAction('folders', { folderID: id }),
                hold_action: createViewAction('folder', { folderID: id }),
            };
        });
        return {
            icon: 'mdi:folder-multiple',
            ...config.menu.buttons.folders,
            type: 'custom:advanced-camera-card-menu-submenu',
            title: localize('config.menu.buttons.folders'),
            items: submenuItems,
            style: view?.isAnyFolderView() ? this._getEmphasizedStyle() : {},
        };
    }
    /**
     * Get the style of emphasized menu items.
     * @returns A StyleInfo.
     */
    _getEmphasizedStyle(critical) {
        if (critical) {
            return {
                animation: 'pulse 3s infinite',
                color: 'var(--advanced-camera-card-menu-button-critical-color)',
            };
        }
        return {
            color: 'var(--advanced-camera-card-menu-button-active-color)',
        };
    }
    /**
     * Given a button determine if the style should be emphasized by examining all
     * of the actions sequentially.
     * @param button The button to examine.
     * @returns A StyleInfo object.
     */
    _getStyleFromActions(config, button, options) {
        for (const actionSet of [
            button.tap_action,
            button.double_tap_action,
            button.hold_action,
            button.start_tap_action,
            button.end_tap_action,
        ]) {
            for (const action of arrayify(actionSet)) {
                if (!isAdvancedCameraCardCustomAction(action)) {
                    continue;
                }
                if (VIEWS_USER_SPECIFIED.some((viewName) => viewName === action.advanced_camera_card_action &&
                    options?.view?.is(action.advanced_camera_card_action)) ||
                    (action.advanced_camera_card_action === 'default' &&
                        options?.view?.is(config.view.default)) ||
                    (action.advanced_camera_card_action === 'fullscreen' &&
                        !!options?.fullscreenManager?.isInFullscreen()) ||
                    (action.advanced_camera_card_action === 'camera_select' &&
                        options?.view?.camera === action.camera)) {
                    return this._getEmphasizedStyle();
                }
            }
        }
        return {};
    }
}

const effectRegistry = {
    fireworks: async () => {
        const module = await import('./fireworks-af20a27c.js');
        return { default: module.AdvancedCameraCardEffectFireworks };
    },
    ghost: async () => {
        const module = await import('./ghost-3853a270.js');
        return { default: module.AdvancedCameraCardEffectGhost };
    },
    hearts: async () => {
        const module = await import('./hearts-aeb0d968.js');
        return { default: module.AdvancedCameraCardEffectHearts };
    },
    shamrocks: async () => {
        const module = await import('./shamrocks-5227a611.js');
        return { default: module.AdvancedCameraCardEffectShamrocks };
    },
    snow: async () => {
        const module = await import('./snow-2bc00a77.js');
        return { default: module.AdvancedCameraCardEffectSnow };
    },
};
class EffectsController {
    constructor() {
        this._importedModules = new Map();
        this._activeInstances = new Map();
        this._container = null;
    }
    setContainer(container) {
        this._container = container;
    }
    async startEffect(name, options) {
        if (!this._container || this._activeInstances.has(name)) {
            return;
        }
        // Reserve the slot immediately with null to prevent concurrent starts.
        this._activeInstances.set(name, null);
        const effectModule = await this._importEffectModule(name);
        // Check if the effect was cancelled during loading.
        if (!effectModule || !this._activeInstances.has(name)) {
            this._activeInstances.delete(name);
            return;
        }
        const effectComponent = new effectModule.default();
        effectComponent.fadeIn = options?.fadeIn ?? true;
        this._container.appendChild(effectComponent);
        this._activeInstances.set(name, effectComponent);
    }
    async stopEffect(effect) {
        if (!this._activeInstances.has(effect)) {
            return;
        }
        const instance = this._activeInstances.get(effect);
        this._activeInstances.delete(effect);
        // If instance is null, it's still loading - just clearing the reservation
        // will prevent it from appearing (startEffect checks this after import).
        if (instance) {
            await instance.startFadeOut();
            instance.remove();
        }
    }
    async toggleEffect(name, options) {
        if (this._activeInstances.has(name)) {
            await this.stopEffect(name);
        }
        else {
            await this.startEffect(name, options);
        }
    }
    async _importEffectModule(name) {
        const existingModule = this._importedModules.get(name);
        if (existingModule) {
            return existingModule;
        }
        const effectModule = await effectRegistry[name]?.();
        if (!effectModule) {
            return null;
        }
        this._importedModules.set(name, effectModule);
        return effectModule;
    }
}

var css$c = "/************\n * Managing z-indicies and stacking contexts is very challenging on the card,\n * due to the volume of different potentially overlapping surfaces. In\n * particular, care must be taken to not generate new stacking contexts\n * inadvertently which would make \"z-index\" weaving challenging (e.g. submenu\n * shown for PTZ presets, needs to render \"over\" the media drawer open/close\n * control).\n *************/\n:host {\n  display: block;\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: 7;\n}";

let AdvancedCameraCardEffects = class AdvancedCameraCardEffects extends s {
    constructor() {
        super(...arguments);
        this._controller = new EffectsController();
    }
    async startEffect(effect, options) {
        await this._controller.startEffect(effect, options);
    }
    stopEffect(effect) {
        this._controller.stopEffect(effect);
    }
    async toggleEffect(effect, options) {
        await this._controller.toggleEffect(effect, options);
    }
    updated() {
        this._controller.setContainer(this.renderRoot);
    }
    static get styles() {
        return r(css$c);
    }
};
AdvancedCameraCardEffects = __decorate([
    t('advanced-camera-card-effects')
], AdvancedCameraCardEffects);

/**
 * Dispatch an event with an error message to show to the user. Calling this
 * method will grind the card to a halt, so should only be used for "global" /
 * critical errors (i.e. not for individual errors with a given camera, since
 * there may be multiple correctly functioning cameras in a grid).
 * @param element The element to send the event.
 * @param message The message to show.
 */
const dispatchAdvancedCameraCardErrorEvent = (element, error) => {
    if (error instanceof Error) {
        fireAdvancedCameraCardEvent(element, 'message', {
            message: error.message,
            type: 'error',
            ...(error instanceof AdvancedCameraCardError && { context: error.context }),
        });
    }
};

class ConditionStateManagerGetEvent extends Event {
    constructor(eventInitDict) {
        super('advanced-camera-card:condition-state-manager:get', eventInitDict);
    }
}
/**
 * Fetch the main ConditionStateManager via an event.
 * @returns The ConditionStateManager or null if not found.
 */
function getConditionStateManagerViaEvent(element) {
    const getEvent = new ConditionStateManagerGetEvent({
        bubbles: true,
        composed: true,
    });
    /* Special note on what's going on here:
     *
     * Some parts of the card (e.g. <advanced-camera-card-elements>) may have arbitrary
     * complexity and layers (that this card doesn't control) between that master
     * element and the element that needs to evaluate the condition. In these
     * cases there's no clean way to pass state from the rest of card down through
     * these layers. Instead, an event is dispatched as a "request for evaluation"
     * (ConditionEvaluateRequestEvent) upwards which is caught by the outer card
     * and the evaluation result is added to the event object. Because event
     * propagation is handled synchronously, the result will be added to the event
     * before the flow proceeds.
     */
    element.dispatchEvent(getEvent);
    return getEvent.conditionStateManager ?? null;
}

var css$b = ":host {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.element {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  pointer-events: auto;\n}\n\nhui-error-card.element {\n  inset: 0px;\n  transform: unset;\n}";

// A small wrapper around a HA conditional element used to render a set of
// picture elements.
let AdvancedCameraCardElementsCore = class AdvancedCameraCardElementsCore extends s {
    constructor() {
        super(...arguments);
        this._root = null;
        this._templateRenderer = new TemplateRenderer();
        this._setNewRoot = () => {
            if (!this.hass) {
                return;
            }
            const elements = this._templateRenderer.renderRecursively(this.hass, this.elements, {
                conditionState: this.conditionStateManager?.getState(),
            });
            // Condition state changes won't change the actual rendered config unless
            // `elements` has a template, which is more likely does not. Avoid updating
            // the root if nothing changes.
            if (this._root && isEqual(this._renderedElements, elements)) {
                return;
            }
            try {
                this._renderedElements = elements;
                this._root = this._createRoot();
            }
            catch (e) {
                return dispatchAdvancedCameraCardErrorEvent(this, e);
            }
        };
    }
    /**
     * Create a transparent render root.
     */
    createRenderRoot() {
        return this;
    }
    /**
     * Create the root node for our picture elements.
     * @returns The newly created root.
     */
    _createRoot() {
        const elementConstructor = customElements.get('hui-conditional-element');
        if (!elementConstructor || !this.hass) {
            throw new Error(localize('error.could_not_render_elements'));
        }
        const element = new elementConstructor();
        element.hass = this.hass;
        const config = {
            type: 'conditional',
            conditions: [],
            elements: this._renderedElements,
        };
        try {
            element.setConfig(config);
        }
        catch (e) {
            errorToConsole(e, console.error);
            throw new AdvancedCameraCardError(localize('error.invalid_elements_config'));
        }
        return element;
    }
    connectedCallback() {
        super.connectedCallback();
        this.conditionStateManager?.addListener(this._setNewRoot);
    }
    disconnectedCallback() {
        this.conditionStateManager?.removeListener(this._setNewRoot);
        super.disconnectedCallback();
    }
    willUpdate(changedProps) {
        if (changedProps.has('conditionStateManager') && this.conditionStateManager) {
            changedProps.get('conditionStateManager')?.removeEventListener(this._setNewRoot);
            this.conditionStateManager.addListener(this._setNewRoot);
        }
        // The root is only created once per elements configuration change, to
        // avoid the elements being continually re-created & destroyed (for some
        // elements, e.g. image, recreation causes a flicker).
        if (!this._root ||
            changedProps.has('elements') ||
            changedProps.has('conditionStateManager')) {
            this._setNewRoot();
        }
    }
    render() {
        return x `${this._root || ''}`;
    }
    updated() {
        if (this.hass && this._root) {
            // Always update hass. It is used as a trigger to re-evaluate conditions
            // down the chain, see the note on AdvancedCameraCardElementsConditional.
            this._root.hass = this.hass;
        }
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElementsCore.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElementsCore.prototype, "elements", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElementsCore.prototype, "conditionStateManager", void 0);
__decorate([
    r$1()
], AdvancedCameraCardElementsCore.prototype, "_root", void 0);
AdvancedCameraCardElementsCore = __decorate([
    t('advanced-camera-card-elements-core')
], AdvancedCameraCardElementsCore);
let AdvancedCameraCardElements = class AdvancedCameraCardElements extends s {
    constructor() {
        super(...arguments);
        this._menuRemoveHandler = (ev) => {
            // Re-dispatch event from this element (instead of the disconnected one, as
            // there is no parent of the disconnected element).
            fireAdvancedCameraCardEvent(this, 'menu:remove', ev.detail);
        };
        this._statusBarRemoveHandler = (ev) => {
            // Re-dispatch event from this element (instead of the disconnected one, as
            // there is no parent of the disconnected element).
            fireAdvancedCameraCardEvent(this, 'status-bar:remove', ev.detail);
        };
        this._menuAddHandler = (ev) => {
            ev = ev;
            const path = ev.composedPath();
            if (!path.length) {
                return;
            }
            this._addHandler(path[0], 'advanced-camera-card:menu:remove', this._menuRemoveHandler);
        };
        this._statusBarAddHandler = (ev) => {
            ev = ev;
            const path = ev.composedPath();
            if (!path.length) {
                return;
            }
            this._addHandler(path[0], 'advanced-camera-card:status-bar:remove', this._statusBarRemoveHandler);
        };
    }
    _addHandler(target, eventName, handler) {
        // Ensure listener is only attached 1 time by removing it first.
        target.removeEventListener(eventName, handler);
        target.addEventListener(eventName, handler);
    }
    connectedCallback() {
        super.connectedCallback();
        // Catch icons being added to the menu or status-bar (so their removal can
        // be subsequently handled).
        this.addEventListener('advanced-camera-card:menu:add', this._menuAddHandler);
        this.addEventListener('advanced-camera-card:status-bar:add', this._statusBarAddHandler);
    }
    disconnectedCallback() {
        this.removeEventListener('advanced-camera-card:menu:add', this._menuAddHandler);
        this.addEventListener('advanced-camera-card:status-bar:add', this._statusBarAddHandler);
        super.disconnectedCallback();
    }
    render() {
        return x `<advanced-camera-card-elements-core
      .conditionStateManager=${this.conditionStateManager}
      .hass=${this.hass}
      .elements=${this.elements}
    >
    </advanced-camera-card-elements-core>`;
    }
    static get styles() {
        return r(css$b);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElements.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElements.prototype, "elements", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardElements.prototype, "conditionStateManager", void 0);
AdvancedCameraCardElements = __decorate([
    t('advanced-camera-card-elements')
], AdvancedCameraCardElements);
/**
 * An element that can render others based on card state (e.g. only show
 * overlays in particular views). This is the Advanced Camera Card equivalent to
 * the HA conditional card.
 */
let AdvancedCameraCardElementsConditional = class AdvancedCameraCardElementsConditional extends s {
    constructor() {
        super(...arguments);
        this._conditionManager = null;
    }
    /**
     * Set the card configuration.
     * @param config The card configuration.
     */
    setConfig(config) {
        this._config = config;
        this._createConditionManager();
    }
    /**
     * Create a root into which to render. This card is "transparent".
     * @returns
     */
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        super.connectedCallback();
        // HA will automatically attach the 'element' class to picture elements. As
        // this is a transparent 'conditional' element (just like the stock HA
        // 'conditional' element), it should not have positioning.
        this.className = '';
        this._createConditionManager();
    }
    disconnectedCallback() {
        this._conditionManager?.destroy();
        super.disconnectedCallback();
    }
    _createConditionManager() {
        const conditionStateManager = getConditionStateManagerViaEvent(this);
        if (!this._config || !conditionStateManager) {
            return;
        }
        this._conditionManager?.destroy();
        this._conditionManager = new ConditionsManager(this._config.conditions, conditionStateManager);
        this._conditionManager.addListener(() => this.requestUpdate());
    }
    render() {
        if (this._conditionManager?.getEvaluation()?.result) {
            return x ` <advanced-camera-card-elements-core
        .hass=${this.hass}
        .elements=${this._config?.elements}
      >
      </advanced-camera-card-elements-core>`;
        }
    }
};
__decorate([
    n({ attribute: false, hasChanged: () => true })
], AdvancedCameraCardElementsConditional.prototype, "hass", void 0);
AdvancedCameraCardElementsConditional = __decorate([
    t('advanced-camera-card-conditional')
], AdvancedCameraCardElementsConditional);
// A base class for rendering menu icons / menu state icons.
class AdvancedCameraCardElementsBaseItem extends s {
    constructor(eventCategory) {
        super();
        this._config = null;
        this._eventCategory = eventCategory;
    }
    setConfig(config) {
        this._config = config;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this._config) {
            fireAdvancedCameraCardEvent(this, `${this._eventCategory}:add`, this._config);
        }
    }
    disconnectedCallback() {
        if (this._config) {
            fireAdvancedCameraCardEvent(this, `${this._eventCategory}:remove`, this._config);
        }
        super.disconnectedCallback();
    }
}
__decorate([
    r$1()
], AdvancedCameraCardElementsBaseItem.prototype, "_config", void 0);
class AdvancedCameraCardElementsBaseMenuItem extends AdvancedCameraCardElementsBaseItem {
    constructor() {
        super('menu');
    }
}
let AdvancedCameraCardElementsMenuIcon = class AdvancedCameraCardElementsMenuIcon extends AdvancedCameraCardElementsBaseMenuItem {
};
AdvancedCameraCardElementsMenuIcon = __decorate([
    t('advanced-camera-card-menu-icon')
], AdvancedCameraCardElementsMenuIcon);
let AdvancedCameraCardElementsMenuStateIcon = class AdvancedCameraCardElementsMenuStateIcon extends AdvancedCameraCardElementsBaseMenuItem {
};
AdvancedCameraCardElementsMenuStateIcon = __decorate([
    t('advanced-camera-card-menu-state-icon')
], AdvancedCameraCardElementsMenuStateIcon);
let AdvancedCameraCardElementsMenuSubmenu = class AdvancedCameraCardElementsMenuSubmenu extends AdvancedCameraCardElementsBaseMenuItem {
};
AdvancedCameraCardElementsMenuSubmenu = __decorate([
    t('advanced-camera-card-menu-submenu')
], AdvancedCameraCardElementsMenuSubmenu);
let AdvancedCameraCardElementsMenuSubmenuSelect = class AdvancedCameraCardElementsMenuSubmenuSelect extends AdvancedCameraCardElementsBaseMenuItem {
};
AdvancedCameraCardElementsMenuSubmenuSelect = __decorate([
    t('advanced-camera-card-menu-submenu-select')
], AdvancedCameraCardElementsMenuSubmenuSelect);
class AdvancedCameraCardElementsBaseStatusBarItem extends AdvancedCameraCardElementsBaseItem {
    constructor() {
        super('status-bar');
    }
}
let AdvancedCameraCardElementsStatusBarIcon = class AdvancedCameraCardElementsStatusBarIcon extends AdvancedCameraCardElementsBaseStatusBarItem {
};
AdvancedCameraCardElementsStatusBarIcon = __decorate([
    t('advanced-camera-card-status-bar-icon')
], AdvancedCameraCardElementsStatusBarIcon);
let AdvancedCameraCardElementsStatusBarImage = class AdvancedCameraCardElementsStatusBarImage extends AdvancedCameraCardElementsBaseStatusBarItem {
};
AdvancedCameraCardElementsStatusBarImage = __decorate([
    t('advanced-camera-card-status-bar-image')
], AdvancedCameraCardElementsStatusBarImage);
let AdvancedCameraCardElementsStatusBarString = class AdvancedCameraCardElementsStatusBarString extends AdvancedCameraCardElementsBaseStatusBarItem {
};
AdvancedCameraCardElementsStatusBarString = __decorate([
    t('advanced-camera-card-status-bar-string')
], AdvancedCameraCardElementsStatusBarString);

var css$a = "ha-icon-button {\n  color: var(--advanced-camera-card-button-color);\n  background-color: var(--advanced-camera-card-button-background);\n  border-radius: var(--advanced-camera-card-button-border-radius);\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n}\n\n:host {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\nslot {\n  position: absolute;\n  display: flex;\n}\n\n/***************\n * Slot position\n ***************/\nslot[name=top] {\n  top: 0px;\n}\n\nslot[name=bottom] {\n  bottom: 0px;\n}\n\nslot[name=left] {\n  left: 0px;\n}\n\nslot[name=right] {\n  right: 0px;\n}\n\n/***********\n * Slot size\n ***********/\nslot[name=top],\nslot[name=bottom] {\n  width: 100%;\n  flex-direction: column;\n}\n\nslot[name=left],\nslot[name=right] {\n  height: 100%;\n  flex-direction: row;\n}\n\nslot[name=top],\nslot[name=left] {\n  justify-content: flex-start;\n}\n\nslot[name=bottom],\nslot[name=right] {\n  justify-content: flex-end;\n}";

let AdvancedCameraCardOverlay = class AdvancedCameraCardOverlay extends s {
    render() {
        return x `
      <slot name="top"></slot>
      <slot name="left"></slot>
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    `;
    }
    static get styles() {
        return r(css$a);
    }
};
AdvancedCameraCardOverlay = __decorate([
    t('advanced-camera-card-overlay')
], AdvancedCameraCardOverlay);

class StatusBarController {
    constructor(host) {
        this._config = null;
        this._popupTimer = new Timer();
        this._items = [];
        this._host = host;
    }
    getRenderItems() {
        return this._items;
    }
    setItems(items) {
        const exclusiveItems = items.filter((item) => !!item.exclusive);
        const newItems = orderBy(exclusiveItems.length ? exclusiveItems : items, (item) => item.priority ?? STATUS_BAR_PRIORITY_DEFAULT, 'desc');
        const sufficientBefore = this._getSufficientValues(this._items);
        const sufficientAfter = this._getSufficientValues(newItems);
        this._items = newItems;
        if (this._config?.style === 'popup' && !isEqual(sufficientBefore, sufficientAfter)) {
            this._show();
            this._popupTimer.start(this._config.popup_seconds, () => this._hide());
        }
        this._host.requestUpdate();
    }
    setConfig(config) {
        this._config = config;
        this._host.style.setProperty('--advanced-camera-card-status-bar-height', `${config.height}px`);
        this._host.setAttribute('data-style', config.style);
        this._host.setAttribute('data-position', config.position);
        if (this._config?.style !== 'popup') {
            this._show();
        }
        this._host.requestUpdate();
    }
    getConfig() {
        return this._config;
    }
    shouldRender() {
        return this._items.some((item) => item.enabled !== false && item.sufficient);
    }
    actionHandler(ev, config) {
        // These interactions should only be handled by the status bar, as nothing
        // upstream has the user-provided configuration.
        ev.stopPropagation();
        const interaction = ev.detail.action;
        const action = getActionConfigGivenAction(interaction, config);
        if (!action) {
            return;
        }
        dispatchActionExecutionRequest(this._host, {
            actions: arrayify(action),
            config: config,
        });
    }
    _getSufficientValue(item) {
        /* istanbul ignore else: cannot happen -- @preserve */
        if (item.type === 'custom:advanced-camera-card-status-bar-icon') {
            return item.icon;
        }
        else if (item.type === 'custom:advanced-camera-card-status-bar-string') {
            return item.string;
        }
        else if (item.type === 'custom:advanced-camera-card-status-bar-image') {
            return item.image;
        }
        else {
            return null;
        }
    }
    _getSufficientValues(items) {
        return items
            .filter((item) => item.enabled !== false && item.sufficient)
            .map((item) => this._getSufficientValue(item));
    }
    _show() {
        setOrRemoveAttribute(this._host, false, 'hide');
    }
    _hide() {
        setOrRemoveAttribute(this._host, true, 'hide');
    }
}

var css$9 = "ha-icon-button {\n  color: var(--advanced-camera-card-button-color);\n  background-color: var(--advanced-camera-card-button-background);\n  border-radius: var(--advanced-camera-card-button-border-radius);\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n}\n\n:host {\n  --mdc-icon-size: calc(var(--advanced-camera-card-status-bar-height) / 2);\n  display: block;\n  width: 100%;\n  pointer-events: auto;\n  opacity: 1;\n  transition: opacity 1s;\n}\n\n/*******************************************************\n * Non-hover styles should not interact with the pointer\n *******************************************************/\n:host(:not([data-style*=hover])) {\n  pointer-events: none;\n}\n\n/**********************\n * Popup style behavior\n **********************/\n:host([data-style=popup][hide]) {\n  opacity: 0;\n}\n\n/*********************\n * Status bar contents\n *********************/\n.status {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  overflow: hidden;\n  width: 100%;\n  height: var(--advanced-camera-card-status-bar-height);\n}\n\n.item {\n  display: inline-block;\n  margin: 3px 5px;\n  align-content: center;\n}\n\n.item:first-child {\n  margin-left: 10px;\n}\n\n.item:last-child {\n  margin-right: 10px;\n}\n\n.item.expand {\n  flex: 1;\n}\n\n.item.action {\n  cursor: pointer;\n}\n\nimg.item,\nadvanced-camera-card-icon.item {\n  display: block;\n  height: var(--mdc-icon-size, 24px);\n  width: auto;\n}\n\n/************************\n * Status bar theme hooks\n ************************/";

let AdvancedCameraCardStatusBar = class AdvancedCameraCardStatusBar extends s {
    constructor() {
        super(...arguments);
        this._controller = new StatusBarController(this);
    }
    willUpdate(changedProperties) {
        // Always set config before items.
        if (changedProperties.has('config') && this.config) {
            this._controller.setConfig(this.config);
        }
        if (changedProperties.has('items')) {
            this._controller.setItems(this.items ?? []);
        }
    }
    /** Theme-related styling is dynamically injected into the status bar depending on
     * the configured position and style to allow precise theming.
     *
     * Each rule uses 'var' values that have nested fallbacks of decreasing
     * specificity, so the most specific theme variable will match, followed by
     * the next most specific, etc.
     */
    _renderPerInstanceStyle() {
        const config = this._controller.getConfig();
        if (!config) {
            return;
        }
        const position = config.position;
        const style = config.style;
        const generateValue = (suffix) => {
            return `
        var(--advanced-camera-card-status-bar-override-${suffix},
        var(--advanced-camera-card-status-bar-position-${position}-style-${style}-${suffix},
        var(--advanced-camera-card-status-bar-position-${position}-${suffix},
        var(--advanced-camera-card-status-bar-style-${style}-${suffix},
        var(--advanced-camera-card-status-bar-${suffix})))))`;
        };
        const rule = `[data-position='${position}']` + `[data-style='${style}']`;
        return x `<style>
      :host(${rule}) {
        color: ${generateValue('color')};
        background: ${generateValue('background')};
      }
    </style>`;
    }
    render() {
        if (!this._controller.shouldRender()) {
            return;
        }
        return x `
      ${this._renderPerInstanceStyle()}
      <div class="status">
        ${this._controller.getRenderItems().map((item) => {
            if (item.enabled === false) {
                return;
            }
            const classes = e({
                item: true,
                expand: !!item.expand,
                action: !!Object.keys(item.actions ?? {}).length,
            });
            const handler = actionHandler({
                hasHold: hasAction(item.actions?.hold_action),
                hasDoubleClick: hasAction(item.actions?.double_tap_action),
            });
            if (item.type === 'custom:advanced-camera-card-status-bar-string') {
                return x `<div
              .actionHandler=${handler}
              class="${classes}"
              @action=${(ev) => this._controller.actionHandler(ev, item.actions)}
            >
              ${item.string}
            </div>`;
            }
            else if (item.type === 'custom:advanced-camera-card-status-bar-icon') {
                return x `<advanced-camera-card-icon
              .actionHandler=${handler}
              .icon=${{ icon: item.icon }}
              class="${classes}"
              @action=${(ev) => this._controller.actionHandler(ev, item.actions)}
            ></advanced-camera-card-icon>`;
            }
            else if (item.type === 'custom:advanced-camera-card-status-bar-image') {
                return x `<img
              .actionHandler=${handler}
              class="${classes}"
              src="${item.image}"
              @action=${(ev) => this._controller.actionHandler(ev, item.actions)}
            />`;
            }
        })}
      </div>
    `;
    }
    static get styles() {
        return r(css$9);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardStatusBar.prototype, "items", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardStatusBar.prototype, "config", void 0);
AdvancedCameraCardStatusBar = __decorate([
    t('advanced-camera-card-status-bar')
], AdvancedCameraCardStatusBar);

class RemoveContextViewModifier {
    constructor(keys) {
        this._keys = keys;
    }
    modify(view) {
        this._keys.forEach((key) => view.removeContext(key));
    }
}

const upFolderClickHandler = (_item, ev, viewManagerEpoch) => {
    stopEventFromActivatingCardWideActions(ev);
    const query = viewManagerEpoch?.manager.getView()?.query;
    if (!query || !QueryClassifier.isFolderQuery(query)) {
        return;
    }
    const rawQuery = query?.getQuery();
    if (!rawQuery?.path || rawQuery?.path.length <= 1) {
        return;
    }
    const path = rawQuery.path.slice(0, -1);
    viewManagerEpoch?.manager.setViewByParametersWithExistingQuery({
        params: {
            query: query.clone().setQuery({
                folder: rawQuery.folder,
                path: [path[0], ...path.slice(1)],
            }),
        },
    });
};
const getUpFolderMediaItem = (view) => {
    const query = view?.query;
    if (!query || !QueryClassifier.isFolderQuery(query)) {
        return null;
    }
    const rawQuery = query.getQuery();
    if (!rawQuery?.folder || !rawQuery?.path || rawQuery.path.length <= 1) {
        return null;
    }
    return new ViewFolder(rawQuery.folder, {
        icon: 'mdi:arrow-up-left',
    });
};

var css$8 = ":host {\n  --advanced-camera-card-thumbnail-size-max: 300px;\n  --advanced-camera-card-thumbnail-details-width: calc(\n    var(--advanced-camera-card-thumbnail-size) + 200px\n  );\n}\n\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: var(--advanced-camera-card-thumbnail-background);\n  --advanced-camera-card-carousel-thumbnail-opacity: 1;\n}\n\n:host([direction=vertical]) {\n  height: 100%;\n}\n\n:host([direction=horizontal]) {\n  height: auto;\n}\n\n.embla__slide {\n  flex: 0 0 auto;\n  opacity: var(--advanced-camera-card-carousel-thumbnail-opacity);\n}\n\n.embla__slide.slide-selected {\n  opacity: 1;\n}\n\nadvanced-camera-card-thumbnail {\n  width: var(--advanced-camera-card-thumbnail-size);\n  height: var(--advanced-camera-card-thumbnail-size);\n  max-width: 100%;\n}\n\nadvanced-camera-card-thumbnail[details] {\n  width: var(--advanced-camera-card-thumbnail-details-width);\n}";

var css$7 = ":host {\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s linear;\n}\n\n:host(:not([details])) {\n  aspect-ratio: 1/1;\n}\n\n:host([details]) {\n  border: 1px solid var(--advanced-camera-card-thumbnail-border-color);\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  padding: 2px;\n  background-color: var(--advanced-camera-card-thumbnail-background);\n}\n\n:host(:hover) {\n  transform: scale(1.04);\n}\n\nadvanced-camera-card-icon {\n  position: absolute;\n  border-radius: 50%;\n  color: var(--advanced-camera-card-thumbnail-icon-color);\n  cursor: pointer;\n  transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;\n}\n\nadvanced-camera-card-icon:hover {\n  opacity: 1;\n}\n\nadvanced-camera-card-icon.star {\n  top: 3px;\n  left: 3px;\n}\n\nadvanced-camera-card-icon.star.starred {\n  color: var(--advanced-camera-card-thumbnail-icon-favorite-color);\n}\n\nadvanced-camera-card-icon.timeline {\n  top: 3px;\n  right: 3px;\n}\n\nadvanced-camera-card-icon.download {\n  right: 3px;\n  bottom: 3px;\n}\n\nadvanced-camera-card-thumbnail-details {\n  flex: 1;\n}";

class ThumbnailDetailsController {
    constructor() {
        this._details = [];
        this._heading = null;
    }
    calculate(cameraManager, item, seek) {
        const cameraID = ViewItemClassifier.isMedia(item) ? item.getCameraID() : null;
        const cameraMetadata = cameraID
            ? cameraManager?.getCameraMetadata(cameraID) ?? null
            : null;
        this._calculateHeading(cameraMetadata, item);
        this._calculateDetails(cameraMetadata, item, seek);
    }
    _calculateHeading(cameraMetadata, item) {
        if (ViewItemClassifier.isEvent(item)) {
            const what = prettifyTitle(item.getWhat()?.join(', ')) ?? null;
            const tags = prettifyTitle(item.getTags()?.join(', ')) ?? null;
            const whatWithTags = what || tags ? (what ?? '') + (what && tags ? ': ' : '') + (tags ?? '') : null;
            const rawScore = item.getScore();
            const score = rawScore ? (rawScore * 100).toFixed(2) + '%' : null;
            this._heading = whatWithTags ? `${whatWithTags}${score ? ` ${score}` : ''}` : null;
            return;
        }
        if (cameraMetadata?.title) {
            this._heading = cameraMetadata.title;
            return;
        }
        this._heading = null;
    }
    _calculateDetails(cameraMetadata, item, seek) {
        const itemTitle = item?.getTitle() ?? null;
        const startTime = ViewItemClassifier.isMedia(item) ? item.getStartTime() : null;
        const endTime = ViewItemClassifier.isMedia(item) ? item.getEndTime() : null;
        const duration = startTime && endTime ? getDurationString(startTime, endTime) : null;
        const inProgress = ViewItemClassifier.isMedia(item)
            ? item.inProgress()
                ? localize('thumbnail.in_progress')
                : null
            : null;
        const where = ViewItemClassifier.isMedia(item)
            ? prettifyTitle(item?.getWhere()?.join(', ')) ?? null
            : null;
        const tags = ViewItemClassifier.isEvent(item)
            ? prettifyTitle(item?.getTags()?.join(', ')) ?? null
            : null;
        const seekString = seek ? format(seek, 'HH:mm:ss') : null;
        const details = [
            ...(startTime
                ? [
                    {
                        hint: localize('thumbnail.start'),
                        icon: { icon: 'mdi:calendar-clock-outline' },
                        title: format(startTime, 'yyyy-MM-dd HH:mm:ss'),
                    },
                ]
                : []),
            ...(duration || inProgress
                ? [
                    {
                        hint: localize('thumbnail.duration'),
                        icon: { icon: 'mdi:clock-outline' },
                        title: `${duration ?? ''}${duration && inProgress ? ' ' : ''}${inProgress ?? ''}`,
                    },
                ]
                : []),
            ...(cameraMetadata?.title
                ? [
                    {
                        hint: localize('thumbnail.camera'),
                        title: cameraMetadata.title,
                        icon: { icon: 'mdi:cctv' },
                    },
                ]
                : []),
            ...(where
                ? [
                    {
                        hint: localize('thumbnail.where'),
                        title: where,
                        icon: { icon: 'mdi:map-marker-outline' },
                    },
                ]
                : []),
            ...(tags
                ? [
                    {
                        hint: localize('thumbnail.tag'),
                        title: tags,
                        icon: { icon: 'mdi:tag' },
                    },
                ]
                : []),
            ...(seekString
                ? [
                    {
                        hint: localize('thumbnail.seek'),
                        title: seekString,
                        icon: { icon: 'mdi:clock-fast' },
                    },
                ]
                : []),
        ];
        // To avoid duplication, if the event has a starttime, the title is omitted
        // from the details.
        const includeTitle = !ViewItemClassifier.isEvent(item) || !startTime;
        this._details = [
            ...(includeTitle && itemTitle
                ? [
                    {
                        title: itemTitle,
                        ...(details.length > 0 && {
                            icon: { icon: 'mdi:rename' },
                            hint: localize('thumbnail.title'),
                        }),
                    },
                ]
                : []),
            ...details,
        ];
    }
    getHeading() {
        return this._heading;
    }
    getDetails() {
        return this._details;
    }
}

var css$6 = ":host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-left: 5px;\n  padding: 5px;\n  color: var(--advanced-camera-card-thumbnail-text-color);\n  overflow: hidden;\n  column-gap: 5%;\n}\n\ndiv.heading {\n  font-size: 1.2rem;\n  font-weight: bold;\n}\n\ndiv.details {\n  flex: 1;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  --mdc-icon-size: 16px;\n  min-height: 0px;\n}\n\ndiv.details div {\n  display: flex;\n  align-items: center;\n}\n\ndiv.details div * {\n  margin: 0px 3px;\n}";

let AdvancedCameraCardThumbnailDetails = class AdvancedCameraCardThumbnailDetails extends s {
    constructor() {
        super(...arguments);
        this._controller = new ThumbnailDetailsController();
    }
    willUpdate(changedProperties) {
        if (['item', 'seek', 'cameraManager'].some((prop) => changedProperties.has(prop))) {
            this._controller.calculate(this.cameraManager, this.item, this.seek);
        }
    }
    render() {
        const heading = this._controller.getHeading();
        const details = this._controller.getDetails();
        return x `
      ${heading
            ? x ` <div class="heading">
            <span title=${heading}>${heading}</span>
          </div>`
            : ``}
      ${details
            ? x ` <div class="details">
            ${details.map((detail) => x `<div>
                  ${detail.icon
                ? x ` <advanced-camera-card-icon
                        title=${detail.hint ?? ''}
                        .icon=${detail.icon}
                      ></advanced-camera-card-icon>`
                : ''}
                  <span>${detail.title}</span>
                </div>`)}
          </div>`
            : ''}
    `;
    }
    static get styles() {
        return r(css$6);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailDetails.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailDetails.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailDetails.prototype, "item", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailDetails.prototype, "seek", void 0);
AdvancedCameraCardThumbnailDetails = __decorate([
    t('advanced-camera-card-thumbnail-details')
], AdvancedCameraCardThumbnailDetails);

const brandsUrl = (options) => `https://brands.home-assistant.io/${options.brand ? 'brands/' : ''}${options.useFallback ? '_/' : ''}${options.domain}/${options.darkOptimized ? 'dark_' : ''}${options.type}.png`;
const extractDomainFromBrandUrl = (url) => url.split('/')[4];
const isBrandUrl = (thumbnail) => !!thumbnail?.startsWith('https://brands.home-assistant.io/');

class ThumbnailFeatureController {
    constructor() {
        this._title = null;
        this._subtitles = [];
        this._icon = null;
        this._thumbnail = null;
        this._thumbnailClass = null;
    }
    calculate(cameraManager, item, hasDetails) {
        const cameraID = ViewItemClassifier.isMedia(item) ? item.getCameraID() : null;
        const cameraMetadata = cameraID
            ? cameraManager?.getCameraMetadata(cameraID) ?? null
            : null;
        this._calculateVisuals(cameraMetadata, item);
        this._calculateTitles(cameraMetadata, item, hasDetails);
    }
    _calculateTitles(cameraMetadata, item, hasDetails) {
        if (hasDetails) {
            return;
        }
        if (this._thumbnail && ViewItemClassifier.isMedia(item)) {
            this._title = null;
            this._subtitles = [];
            return;
        }
        const startTime = ViewItemClassifier.isEvent(item) || ViewItemClassifier.isRecording(item)
            ? item.getStartTime()
            : null;
        this._title = startTime ? format(startTime, 'HH:mm') : null;
        const day = startTime ? format(startTime, 'MMM do') : null;
        const itemTitle = item?.getTitle() ?? null;
        const src = cameraMetadata?.title ?? itemTitle ?? null;
        this._subtitles = [...(day ? [day] : []), ...(src ? [src] : [])];
    }
    _calculateVisuals(cameraMetadata, item) {
        let thumbnail = item?.getThumbnail() ?? null;
        if (thumbnail && isBrandUrl(thumbnail)) {
            thumbnail = brandsUrl({
                domain: extractDomainFromBrandUrl(thumbnail),
                type: 'icon',
                useFallback: true,
                brand: true,
            });
        }
        if (thumbnail) {
            this._thumbnail = thumbnail;
            this._icon = null;
            this._thumbnailClass = isBrandUrl(thumbnail) ? 'brand' : null;
        }
        else {
            this._thumbnail = null;
            this._thumbnailClass = null;
            this._icon = item?.getIcon() ?? cameraMetadata?.engineIcon ?? null;
        }
    }
    getTitle() {
        return this._title;
    }
    getSubtitles() {
        return this._subtitles;
    }
    getIcon() {
        return this._icon;
    }
    getThumbnail() {
        return this._thumbnail;
    }
    getThumbnailClass() {
        return this._thumbnailClass;
    }
}

var css$5 = ":host {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  max-width: var(--advanced-camera-card-thumbnail-size);\n  max-height: var(--advanced-camera-card-thumbnail-size);\n  aspect-ratio: 1/1;\n  border: 1px solid var(--secondary-color);\n  background-color: var(--secondary-background-color);\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  box-sizing: border-box;\n  position: relative;\n}\n\nadvanced-camera-card-thumbnail-feature-thumbnail {\n  height: 50%;\n}\n\nadvanced-camera-card-thumbnail-feature-thumbnail.brand:only-child {\n  height: 60%;\n}\n\nadvanced-camera-card-thumbnail-feature-thumbnail:not(.brand):only-child {\n  height: 100%;\n}\n\nadvanced-camera-card-icon:only-child {\n  width: 60%;\n  height: 60%;\n  --mdc-icon-size: 100%;\n}\n\nadvanced-camera-card-icon.background {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  inset: 0;\n  padding: 10%;\n  box-sizing: border-box;\n  pointer-events: none;\n  opacity: 0.1;\n  --mdc-icon-size: 100%;\n}\n\ndiv {\n  text-align: center;\n  color: var(--primary-text-color);\n}\n\ndiv.title {\n  font-size: 1.5rem;\n}\n\ndiv.subtitle {\n  font-size: 0.8em;\n}";

var css$4 = ":host {\n  display: block;\n  overflow: hidden;\n  aspect-ratio: 1/1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nimg {\n  display: block;\n}\n\nimg {\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  vertical-align: top;\n  margin: 0;\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  object-fit: cover;\n}\n\nadvanced-camera-card-icon {\n  display: flex;\n  width: 50%;\n  --mdc-icon-size: 100%;\n  color: var(--primary-text-color);\n  justify-content: center;\n  align-items: center;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  box-sizing: border-box;\n  opacity: 0.2;\n}";

let AdvancedCameraCardThumbnailFeatureThumbnail = class AdvancedCameraCardThumbnailFeatureThumbnail extends s {
    constructor() {
        super(...arguments);
        // Only load thumbnails on view in case there is a very large number of them.
        this._intersectionObserver = new IntersectionObserver(this._intersectionHandler.bind(this));
    }
    connectedCallback() {
        super.connectedCallback();
        this._intersectionObserver.observe(this);
    }
    disconnectedCallback() {
        this._intersectionObserver.disconnect();
        super.disconnectedCallback();
    }
    willUpdate(changedProps) {
        if (changedProps.has('thumbnail')) {
            this._embedThumbnailTask = createFetchThumbnailTask(this, () => this.hass, () => this.thumbnail, false);
            // Reset the observer so the initial intersection handler call will set
            // the visibility correctly.
            this._intersectionObserver.unobserve(this);
            this._intersectionObserver.observe(this);
        }
    }
    _intersectionHandler(entries) {
        if (this._embedThumbnailTask?.status === i.INITIAL &&
            entries.some((entry) => entry.isIntersecting)) {
            this._embedThumbnailTask?.run();
        }
    }
    render() {
        const imageOff = x `<advanced-camera-card-icon
      .icon=${{ icon: 'mdi:image-off' }}
      title=${localize('thumbnail.no_thumbnail')}
    ></advanced-camera-card-icon> `;
        if (!this._embedThumbnailTask) {
            return imageOff;
        }
        return x `${this.thumbnail
            ? renderTask(this._embedThumbnailTask, (embeddedThumbnail) => embeddedThumbnail ? x `<img src="${embeddedThumbnail}" />` : x ``, {
                inProgressFunc: () => x `<advanced-camera-card-icon
                .icon=${{ icon: 'mdi:image-refresh' }}
                title=${localize('thumbnail.no_thumbnail')}
              ></advanced-camera-card-icon> `,
                errorFunc: () => imageOff,
            })
            : imageOff} `;
    }
    static get styles() {
        return r(css$4);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeatureThumbnail.prototype, "thumbnail", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeatureThumbnail.prototype, "hass", void 0);
AdvancedCameraCardThumbnailFeatureThumbnail = __decorate([
    t('advanced-camera-card-thumbnail-feature-thumbnail')
], AdvancedCameraCardThumbnailFeatureThumbnail);

let AdvancedCameraCardThumbnailFeature = class AdvancedCameraCardThumbnailFeature extends s {
    constructor() {
        super(...arguments);
        this._controller = new ThumbnailFeatureController();
    }
    willUpdate(changedProperties) {
        if (['item', 'hasDetails', 'cameraManager'].some((prop) => changedProperties.has(prop))) {
            this._controller.calculate(this.cameraManager, this.item, this.hasDetails);
        }
    }
    render() {
        const title = this._controller.getTitle();
        const subtitles = this._controller.getSubtitles();
        const iconClasses = e({
            background: title || subtitles.length,
        });
        const thumbnailClass = this._controller.getThumbnailClass();
        const thumbnailClasses = e({
            ...(thumbnailClass && { [thumbnailClass]: true }),
        });
        return x `
      ${this._controller.getThumbnail()
            ? x ` <advanced-camera-card-thumbnail-feature-thumbnail
            class="${thumbnailClasses}"
            .hass=${this.hass}
            .thumbnail=${this._controller.getThumbnail()}
            aria-label=${this.item?.getTitle() ?? ''}
            title=${this.item?.getTitle() ?? ''}
          ></advanced-camera-card-thumbnail-feature-thumbnail>`
            : this._controller.getIcon()
                ? x `<advanced-camera-card-icon
              class="${iconClasses}"
              .icon=${{ icon: this._controller.getIcon() }}
            ></advanced-camera-card-icon>`
                : ''}
      ${title || subtitles.length
            ? x `
            ${title ? x `<div class="title">${title}</div>` : ''}
            ${subtitles.length
                ? x `<div>
                  ${subtitles.map((subtitle) => x `<div class="subtitle">${subtitle}</div>`)}
                </div>`
                : ''}
          `
            : x ``}
    `;
    }
    static get styles() {
        return r(css$5);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeature.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeature.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeature.prototype, "item", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailFeature.prototype, "hasDetails", void 0);
AdvancedCameraCardThumbnailFeature = __decorate([
    t('advanced-camera-card-thumbnail-feature')
], AdvancedCameraCardThumbnailFeature);

let AdvancedCameraCardThumbnail = class AdvancedCameraCardThumbnail extends s {
    constructor() {
        super(...arguments);
        this.details = false;
        this.show_favorite_control = false;
        this.show_timeline_control = false;
        this.show_download_control = false;
    }
    /**
     * Render the element.
     * @returns A template to display to the user.
     */
    render() {
        if (!this.item) {
            return;
        }
        const starClasses = {
            star: true,
            starred: ViewItemClassifier.isMedia(this.item) && !!this.item?.isFavorite(),
        };
        const shouldShowTimelineControl = this.show_timeline_control &&
            ((ViewItemClassifier.isEvent(this.item) && this.item.getStartTime()) ||
                (ViewItemClassifier.isRecording(this.item) &&
                    this.item.getStartTime() &&
                    this.item.getEndTime()));
        const mediaCapabilities = this.viewItemManager?.getCapabilities(this.item) ?? null;
        const shouldShowFavoriteControl = this.show_favorite_control &&
            this.item &&
            this.hass &&
            mediaCapabilities?.canFavorite;
        const shouldShowDownloadControl = this.show_download_control &&
            this.hass &&
            this.item.getID() &&
            mediaCapabilities?.canDownload;
        return x `
      <advanced-camera-card-thumbnail-feature
        .cameraManager=${this.cameraManager}
        .hasDetails=${this.details}
        .hass=${this.hass}
        .item=${this.item}
      >
      </advanced-camera-card-thumbnail-feature>
      ${shouldShowFavoriteControl
            ? x ` <advanced-camera-card-icon
            class="${e(starClasses)}"
            title=${localize('thumbnail.retain_indefinitely')}
            .icon=${{ icon: this.item.isFavorite() ? 'mdi:star' : 'mdi:star-outline' }}
            @click=${async (ev) => {
                stopEventFromActivatingCardWideActions(ev);
                if (this.hass && this.item) {
                    try {
                        await this.viewItemManager?.favorite(this.item, !this.item.isFavorite());
                    }
                    catch (e) {
                        errorToConsole(e);
                        return;
                    }
                    this.requestUpdate();
                }
            }}
          /></advanced-camera-card-icon>`
            : ``}
      ${this.details
            ? x `<advanced-camera-card-thumbnail-details
            .hass=${this.hass}
            .item=${this.item ?? undefined}
            .cameraManager=${this.cameraManager}
            .seek=${this.seek}
          ></advanced-camera-card-thumbnail-details>`
            : ''}
      ${shouldShowTimelineControl
            ? x `<advanced-camera-card-icon
            class="timeline"
            .icon=${{ icon: 'mdi:target' }}
            title=${localize('thumbnail.timeline')}
            @click=${(ev) => {
                stopEventFromActivatingCardWideActions(ev);
                if (!this.viewManagerEpoch || !this.item) {
                    return;
                }
                this.viewManagerEpoch.manager.setViewByParameters({
                    params: {
                        view: 'timeline',
                        queryResults: this.viewManagerEpoch?.manager
                            .getView()
                            ?.queryResults?.clone()
                            .selectResultIfFound((media) => media === this.item),
                    },
                    modifiers: [new RemoveContextViewModifier(['timeline'])],
                });
            }}
          ></advanced-camera-card-icon>`
            : ''}
      ${shouldShowDownloadControl
            ? x ` <advanced-camera-card-icon
            class="download"
            .icon=${{ icon: 'mdi:download' }}
            title=${localize('thumbnail.download')}
            @click=${async (ev) => {
                stopEventFromActivatingCardWideActions(ev);
                if (this.hass && this.item) {
                    try {
                        this.viewItemManager?.download(this.item);
                    }
                    catch (error) {
                        dispatchAdvancedCameraCardErrorEvent(this, error);
                    }
                }
            }}
          ></advanced-camera-card-icon>`
            : ``}
    `;
    }
    static get styles() {
        return r(css$7);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnail.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnail.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnail.prototype, "folderManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnail.prototype, "item", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardThumbnail.prototype, "details", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardThumbnail.prototype, "show_favorite_control", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardThumbnail.prototype, "show_timeline_control", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardThumbnail.prototype, "show_download_control", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnail.prototype, "seek", void 0);
AdvancedCameraCardThumbnail = __decorate([
    t('advanced-camera-card-thumbnail')
], AdvancedCameraCardThumbnail);

let AdvancedCameraCardThumbnailCarousel = class AdvancedCameraCardThumbnailCarousel extends s {
    constructor() {
        super(...arguments);
        this.fadeThumbnails = false;
        this._thumbnails = [];
    }
    willUpdate(changedProps) {
        if (changedProps.has('config')) {
            if (this.config?.size) {
                this.style.setProperty('--advanced-camera-card-thumbnail-size', `${this.config.size}px`);
            }
            const direction = this._getDirection();
            if (direction) {
                this.setAttribute('direction', direction);
            }
            else {
                this.removeAttribute('direction');
            }
        }
        const renderProperties = [
            'cameraManager',
            'config',
            'transitionEffect',
            'viewManagerEpoch',
        ];
        if (renderProperties.some((prop) => changedProps.has(prop))) {
            this._thumbnails = this._renderThumbnails();
        }
        if (changedProps.has('viewManagerEpoch')) {
            this.style.setProperty('--advanced-camera-card-carousel-thumbnail-opacity', !this.fadeThumbnails || this._getSelectedSlide() === null ? '1.0' : '0.4');
        }
    }
    _getSelectedSlide() {
        return (this.viewManagerEpoch?.manager.getView()?.queryResults?.getSelectedIndex() ?? null);
    }
    _itemClickCallback(item, ev) {
        stopEventFromActivatingCardWideActions(ev);
        const view = this.viewManagerEpoch?.manager.getView();
        const query = view?.query;
        const results = view?.queryResults;
        if (!view || !query || !results) {
            return;
        }
        if (ViewItemClassifier.isMedia(item)) {
            const newResults = results
                .clone()
                .selectResultIfFound((result) => result === item);
            const cameraID = item.getCameraID();
            fireAdvancedCameraCardEvent(this, 'thumbnails-carousel:media-select', { media: item });
            this.viewManagerEpoch?.manager.setViewByParameters({
                params: {
                    view: 'media',
                    queryResults: newResults,
                    ...(cameraID && { camera: cameraID }),
                },
                modifiers: [new RemoveContextViewModifier(['timeline', 'mediaViewer'])],
            });
        }
        else if (QueryClassifier.isFolderQuery(query) &&
            ViewItemClassifier.isFolder(item)) {
            const rawQuery = query.getQuery();
            if (!rawQuery) {
                return;
            }
            this.viewManagerEpoch?.manager.setViewByParametersWithExistingQuery({
                params: {
                    query: query.clone().setQuery({
                        folder: rawQuery.folder,
                        path: [...(rawQuery.path ?? []), { folder: item }],
                    }),
                },
            });
        }
    }
    _renderThumbnail(item, selected, clickCallback, seekTarget) {
        const classes = {
            embla__slide: true,
            'slide-selected': selected,
        };
        return x ` <advanced-camera-card-thumbnail
      class="${e(classes)}"
      .cameraManager=${this.cameraManager}
      .hass=${this.hass}
      .item=${item}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewItemManager=${this.viewItemManager}
      .seek=${seekTarget &&
            ViewItemClassifier.isMedia(item) &&
            item.includesTime(seekTarget)
            ? seekTarget
            : undefined}
      ?details=${!!this.config?.show_details}
      ?show_favorite_control=${this.config?.show_favorite_control}
      ?show_timeline_control=${this.config?.show_timeline_control}
      ?show_download_control=${this.config?.show_download_control}
      @click=${(ev) => clickCallback(item, ev)}
    >
    </advanced-camera-card-thumbnail>`;
    }
    _renderThumbnails() {
        const upThumbnail = getUpFolderMediaItem(this.viewManagerEpoch?.manager.getView());
        const thumbnails = [
            ...(upThumbnail
                ? [
                    this._renderThumbnail(upThumbnail, false, (item, ev) => upFolderClickHandler(item, ev, this.viewManagerEpoch)),
                ]
                : []),
        ];
        const view = this.viewManagerEpoch?.manager.getView();
        const selectedIndex = this._getSelectedSlide();
        for (const item of view?.queryResults?.getResults() ?? []) {
            thumbnails.push(this._renderThumbnail(item, selectedIndex === thumbnails.length, (item, ev) => this._itemClickCallback(item, ev), view?.context?.mediaViewer?.seek));
        }
        return thumbnails;
    }
    _getDirection() {
        if (this.config?.mode === 'left' || this.config?.mode === 'right') {
            return 'vertical';
        }
        else if (this.config?.mode === 'above' || this.config?.mode === 'below') {
            return 'horizontal';
        }
        return null;
    }
    render() {
        const direction = this._getDirection();
        if (!this._thumbnails.length || !this.config || !direction) {
            return;
        }
        return x `<advanced-camera-card-carousel
      direction=${direction}
      .selected=${this._getSelectedSlide() ?? 0}
      .dragFree=${true}
    >
      ${this._thumbnails}
    </advanced-camera-card-carousel>`;
    }
    static get styles() {
        return r(css$8);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "config", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardThumbnailCarousel.prototype, "fadeThumbnails", void 0);
AdvancedCameraCardThumbnailCarousel = __decorate([
    t('advanced-camera-card-thumbnail-carousel')
], AdvancedCameraCardThumbnailCarousel);

var css$3 = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n:host([hidden]),\n.hidden {\n  display: none;\n}";

// @ts-check

const style = `
:host {
  background-color: #ffffff;
  width: 350px;
  max-width: 75vw;

  visibility: hidden;
  transition: visibility 0.5s;
}

:host([open]) {
  visibility: visible;
}

::slotted(div) {
  box-sizing: border-box;
}

#d {
  position: fixed;
  z-index: 99;
  background-color: inherit;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overscroll-behavior: contain;
  backdrop-filter: var(--side-drawer-backdrop-filter, none);

  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: var(
    --side-drawer-transition,
    transform 0.25s ease-out
  );
  width: inherit;
  max-width: inherit;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

:host([open]) #d {
  transform: none;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.5);
}

#fs {
  position: fixed;
  z-index: 98;
  background-color: #000000;
  backdrop-filter: var(--side-drawer-backdrop-filter, none);

  top: 0;
  bottom: 0;
  right: -30px; /* hide scrollbar until overscroll bug is fixed */
  height: 100vh;
  transition: var(
    --side-drawer-overlay-transition,
    opacity linear 0.25s
  );
  width: calc(
    100vw + 30px
  ); /* put back to just 100vw once overscroll bug fixed */
  opacity: 0;
  visibility: hidden;

  overflow: auto;
  overscroll-behavior: contain;
}

:host([open]) #fs {
  opacity: var(--side-drawer-overlay-opacity, 0.7);
  visibility: visible;
}

/*
   * Workaround for bug https://bugs.chromium.org/p/chromium/issues/detail?id=813094
   * Once bug is fixed and in the wild we can remove this element and make #if overflow:hidden
   * and set "right: 0; width: 100vw" for #fs
   */
#ifs {
  height: calc(100vh + 1px);
}
`;

const template = `
<div id="d"><slot></slot></div>
<div id="fs"><div id="ifs"></div></div>
`;

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

/**
 * A simple side drawer custom element
 */
class SideDrawer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    /**
     * @internal
     * @type {HTMLElement | null}
     */
    this._freeSpaceDiv = shadowRoot.getElementById("fs");
  }

  connectedCallback() {
    if (this._freeSpaceDiv) {
      this._freeSpaceDiv.addEventListener(
        "click",
        this.handleFreeSpaceDivClick
      );
    }

    this.upgradeProperty("open");
  }

  disconnectedCallback() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  /**
   * @param {string} prop
   *
   * @internal
   */
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * @param {KeyboardEvent} e
   *
   * @internal
   */
  handleKeyUp = (e) => {
    if (e.altKey) {
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        this.open = false;
        break;
    }
  };

  get open() {
    return this.hasAttribute("open");
  }

  set open(isOpen) {
    if (isOpen) {
      if (!this.hasAttribute("open")) {
        this.setAttribute("open", "");
      }
    } else {
      if (this.hasAttribute("open")) {
        this.removeAttribute("open");
      }
    }
  }

  static get observedAttributes() {
    return ["open"];
  }

  /**
   * @param {string} name
   * @param {unknown} _oldValue
   * @param {unknown} _newValue
   * @memberof WcMenuButton
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    if (name === "open") {
      // When the drawer is closed, update keyboard/screen reader behavior.
      if (!this.open) {
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", "true");

        document.removeEventListener("keyup", this.handleKeyUp);
        // if (this._bodyOverflow !== undefined) {
        //   document.body.style.overflow = this._bodyOverflow;
        // }
        // if (this._bodyPosition !== undefined) {
        //   document.body.style.position = this._bodyPosition;
        // }

        this.dispatchEvent(
          new CustomEvent("close", {
            bubbles: true,
          })
        );
      } else {
        this.setAttribute("tabindex", "0");
        this.setAttribute("aria-disabled", "false");

        this.focus({
          preventScroll: true,
        });

        document.addEventListener("keyup", this.handleKeyUp);
        // to prevent body behind drawer from scrolling you need
        // to set overflow to hidden and position to fixed (for iOS)
        // TODO: this is too buggy
        // this._bodyOverflow = document.body.style.overflow;
        // document.body.style.overflow = "hidden";
        // this._bodyPosition = document.body.style.position;
        // document.body.style.position = "fixed";

        this.dispatchEvent(
          new CustomEvent("open", {
            bubbles: true,
          })
        );
      }
    }
  }

  /**
   * @internal
   */
  handleFreeSpaceDivClick = () => {
    this.open = false;
  };
}

customElements.define("side-drawer", SideDrawer);

var css$2 = "/************\n * Managing z-indicies and stacking contexts is very challenging on the card,\n * due to the volume of different potentially overlapping surfaces. In\n * particular, care must be taken to not generate new stacking contexts\n * inadvertently which would make \"z-index\" weaving challenging (e.g. submenu\n * shown for PTZ presets, needs to render \"over\" the media drawer open/close\n * control).\n *************/\n:host {\n  width: unset;\n}\n\n#fs {\n  display: none;\n  width: 100%;\n  inset: 0;\n}\n\n#d,\n#fs {\n  height: 100%;\n  position: absolute;\n}\n\n#d {\n  overflow: visible;\n  max-width: 90%;\n  z-index: 3;\n}\n\n:host([location=right]) #d {\n  left: unset;\n  right: 0;\n  transform: translateX(100%);\n}\n\n:host([location=right][open]) #d {\n  transform: none;\n  box-shadow: var(--advanced-camera-card-box-shadow-override, 0px 0px 25px 0px black);\n}\n\n#ifs {\n  height: 100%;\n}";

var css$1 = "side-drawer {\n  background-color: var(--card-background-color);\n}\n\ndiv.control-surround {\n  position: absolute;\n  bottom: 50%;\n  transform: translateY(50%);\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n\n:host([location=left]) div.control-surround {\n  padding-right: 12px;\n  left: 100%;\n}\n\n:host([location=right]) div.control-surround {\n  padding-left: 12px;\n  right: 100%;\n}\n\n:host([empty]),\n:host([empty]) > * {\n  visibility: hidden;\n}\n\n:host(:not([empty])),\n:host(:not([empty])) > * {\n  visibility: visible;\n}\n\nadvanced-camera-card-icon.control {\n  color: var(--advanced-camera-card-button-color);\n  background-color: var(--advanced-camera-card-button-background);\n  pointer-events: all;\n  --mdc-icon-size: 20px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  transition: opacity 0.5s ease;\n}\n\n:host([location=left]) advanced-camera-card-icon.control {\n  border-top-right-radius: 20px;\n  border-bottom-right-radius: 20px;\n}\n\n:host([location=right]) advanced-camera-card-icon.control {\n  border-top-left-radius: 20px;\n  border-bottom-left-radius: 20px;\n}";

let AdvancedCameraCardDrawer = class AdvancedCameraCardDrawer extends s {
    constructor() {
        super(...arguments);
        this.location = 'left';
        this.control = true;
        this.open = false;
        // The 'empty' attribute is used in the styling to change the drawer
        // visibility and that of all descendants if there is no content. Styling is
        // used rather than display or hidden in order to ensure the contents continue
        // to have a measurable size.
        this.empty = true;
        this._refDrawer = e$1();
        this._refSlot = e$1();
        this._resizeObserver = new ResizeObserver(() => this._hideDrawerIfNecessary());
        this._isHoverableDevice = isHoverableDevice();
    }
    /**
     * Called on the first update.
     * @param changedProps The changed properties.
     */
    firstUpdated(changedProps) {
        super.firstUpdated(changedProps);
        // The `side-drawer` component (and the material drawer for that matter)
        // only do fixed drawers (i.e. a drawer for the whole viewport). Hackily
        // override the style to customize the drawer to be absolute within the div.
        const style = document.createElement('style');
        style.innerHTML = css$2;
        this._refDrawer.value?.shadowRoot?.appendChild(style);
    }
    _slotChanged() {
        const children = this._refSlot.value
            ? getChildrenFromElement(this._refSlot.value)
            : [];
        // Watch all slot children for size changes.
        this._resizeObserver.disconnect();
        for (const child of children) {
            this._resizeObserver.observe(child);
        }
        this._hideDrawerIfNecessary();
    }
    _hideDrawerIfNecessary() {
        if (!this._refDrawer.value) {
            return;
        }
        const children = this._refSlot.value
            ? getChildrenFromElement(this._refSlot.value)
            : null;
        this.empty =
            !children ||
                !children.length ||
                children.every((element) => {
                    const box = element.getBoundingClientRect();
                    return !box.width || !box.height;
                });
    }
    render() {
        return x `
      <side-drawer
        ${n$1(this._refDrawer)}
        location="${this.location}"
        ?open=${this.open}
        @mouseleave=${() => {
            this.open = false;
        }}
      >
        ${this.control
            ? x `
              <div
                class="control-surround"
                @click=${(ev) => {
                stopEventFromActivatingCardWideActions(ev);
                this.open = !this.open;
            }}
              >
                <advanced-camera-card-icon
                  class="control"
                  .icon="${{
                icon: this.open
                    ? this.icons?.open ?? 'mdi:menu-open'
                    : this.icons?.closed ?? 'mdi:menu',
            }}"
                  @mouseenter=${() => {
                // Only open the drawer on mousenter when the device
                // supports hover (otherwise iOS may end up passing on
                // subsequent click events to a different element, see:
                // https://github.com/dermotduffy/advanced-camera-card/issues/801
                if (this._isHoverableDevice && !this.open) {
                    this.open = true;
                }
            }}
                >
                </advanced-camera-card-icon>
              </div>
            `
            : ''}
        <slot ${n$1(this._refSlot)} @slotchange=${() => this._slotChanged()}></slot>
      </side-drawer>
    `;
    }
    static get styles() {
        return r(css$1);
    }
};
__decorate([
    n({ attribute: true, reflect: true })
], AdvancedCameraCardDrawer.prototype, "location", void 0);
__decorate([
    n({ attribute: true, reflect: true, type: Boolean })
], AdvancedCameraCardDrawer.prototype, "control", void 0);
__decorate([
    n({ type: Boolean, reflect: true, attribute: true })
], AdvancedCameraCardDrawer.prototype, "open", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardDrawer.prototype, "icons", void 0);
__decorate([
    n({ type: Boolean, reflect: true, attribute: true })
], AdvancedCameraCardDrawer.prototype, "empty", void 0);
AdvancedCameraCardDrawer = __decorate([
    t('advanced-camera-card-drawer')
], AdvancedCameraCardDrawer);

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  overflow: hidden;\n}\n\n::slotted(:not([slot])) {\n  flex: 1;\n  min-height: 0px;\n}";

let AdvancedCameraCardSurroundBasic = class AdvancedCameraCardSurroundBasic extends s {
    constructor() {
        super(...arguments);
        this._refDrawerLeft = e$1();
        this._refDrawerRight = e$1();
        this._boundDrawerHandler = this._drawerHandler.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('advanced-camera-card:drawer:open', this._boundDrawerHandler);
        this.addEventListener('advanced-camera-card:drawer:close', this._boundDrawerHandler);
    }
    disconnectedCallback() {
        this.removeEventListener('advanced-camera-card:drawer:open', this._boundDrawerHandler);
        this.removeEventListener('advanced-camera-card:drawer:close', this._boundDrawerHandler);
        super.disconnectedCallback();
    }
    _drawerHandler(ev) {
        const drawer = ev.detail.drawer;
        const open = ev.type.endsWith(':open');
        if (drawer === 'left' && this._refDrawerLeft.value) {
            this._refDrawerLeft.value.open = open;
        }
        else if (drawer === 'right' && this._refDrawerRight.value) {
            this._refDrawerRight.value.open = open;
        }
    }
    render() {
        return x ` <slot name="above"></slot>
      <slot></slot>
      <advanced-camera-card-drawer
        ${n$1(this._refDrawerLeft)}
        location="left"
        .icons=${this.drawerIcons?.left}
      >
        <slot name="left"></slot>
      </advanced-camera-card-drawer>
      <advanced-camera-card-drawer
        ${n$1(this._refDrawerRight)}
        location="right"
        .icons=${this.drawerIcons?.right}
      >
        <slot name="right"></slot>
      </advanced-camera-card-drawer>
      <slot name="below"></slot>`;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurroundBasic.prototype, "drawerIcons", void 0);
AdvancedCameraCardSurroundBasic = __decorate([
    t('advanced-camera-card-surround-basic')
], AdvancedCameraCardSurroundBasic);

let AdvancedCameraCardSurround = class AdvancedCameraCardSurround extends s {
    constructor() {
        super(...arguments);
        this._timelineKeys = null;
    }
    /**
     * Determine if a drawer is being used.
     * @returns `true` if a drawer is used, `false` otherwise.
     */
    _hasDrawer() {
        return (!!this.thumbnailConfig && ['left', 'right'].includes(this.thumbnailConfig.mode));
    }
    willUpdate(changedProperties) {
        if (this.timelineConfig?.mode && this.timelineConfig.mode !== 'none') {
            import('./timeline-core-41b424f5.js');
        }
        // Only reset the timeline cameraIDs when the media or display mode
        // materially changes (and not on every view change, since the view will
        // change frequently when the user is scrubbing video).
        const view = this.viewManagerEpoch?.manager.getView();
        if (changedProperties.has('viewManagerEpoch') &&
            (this.viewManagerEpoch?.manager.hasMajorMediaChange(this.viewManagerEpoch?.oldView) ||
                this.viewManagerEpoch?.oldView?.displayMode !== view?.displayMode)) {
            const newKeys = this._getTimelineKeys();
            // Update only if changed, to avoid unnecessary timeline destructions.
            if (!isEqual(newKeys, this._timelineKeys)) {
                this._timelineKeys = newKeys ?? undefined;
            }
        }
    }
    _getTimelineKeys() {
        const cameraIDsToKeys = (cameraIDs) => {
            return cameraIDs?.size
                ? {
                    type: 'camera',
                    cameraIDs,
                }
                : null;
        };
        const folderToKeys = (folderConfig) => {
            return {
                type: 'folder',
                folder: folderConfig,
            };
        };
        const view = this.viewManagerEpoch?.manager.getView();
        if (!view || !this.cameraManager) {
            return null;
        }
        if (view.is('live')) {
            const capabilitySearch = {
                anyCapabilities: ['clips', 'snapshots', 'recordings'],
            };
            if (view.supportsMultipleDisplayModes() && view.isGrid()) {
                return cameraIDsToKeys(this.cameraManager.getStore().getCameraIDsWithCapability(capabilitySearch));
            }
            else {
                return cameraIDsToKeys(this.cameraManager
                    .getStore()
                    .getAllDependentCameras(view.camera, capabilitySearch));
            }
        }
        const queries = view.query;
        if (view.isViewerView()) {
            if (QueryClassifier.isMediaQuery(queries)) {
                return cameraIDsToKeys(queries.getQueryCameraIDs());
            }
            else if (QueryClassifier.isFolderQuery(queries)) {
                const folderConfig = queries.getQuery()?.folder;
                return folderConfig ? folderToKeys(folderConfig) : null;
            }
        }
        return null;
    }
    render() {
        const view = this.viewManagerEpoch?.manager.getView();
        if (!this.hass || !view) {
            return;
        }
        const changeDrawer = (ev, action) => {
            // The event catch/re-dispatch below protect encapsulation: Catches the
            // request to view thumbnails and re-dispatches a request to open the drawer
            // (if the thumbnails are in a drawer). The new event needs to be dispatched
            // from the origin of the inbound event, so it can be handled by
            // <advanced-camera-card-surround> .
            if (this.thumbnailConfig && this._hasDrawer()) {
                fireAdvancedCameraCardEvent(ev.composedPath()[0], 'drawer:' + action, {
                    drawer: this.thumbnailConfig.mode,
                });
            }
        };
        return x ` <advanced-camera-card-surround-basic
      @advanced-camera-card:thumbnails-carousel:media-select=${(ev) => changeDrawer(ev, 'close')}
    >
      ${this.thumbnailConfig && this.thumbnailConfig.mode !== 'none'
            ? x ` <advanced-camera-card-thumbnail-carousel
            slot=${this.thumbnailConfig.mode}
            .hass=${this.hass}
            .config=${this.thumbnailConfig}
            .cameraManager=${this.cameraManager}
            .viewItemManager=${this.viewItemManager}
            .fadeThumbnails=${view.isViewerView()}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .selected=${view.queryResults?.getSelectedIndex() ?? undefined}
          >
          </advanced-camera-card-thumbnail-carousel>`
            : ''}
      ${this.timelineConfig && this.timelineConfig.mode !== 'none'
            ? x ` <advanced-camera-card-timeline-core
            slot=${this.timelineConfig.mode}
            .hass=${this.hass}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .itemClickAction=${view.isViewerView() ||
                !this.thumbnailConfig ||
                this.thumbnailConfig?.mode === 'none'
                ? 'play'
                : 'select'}
            .keys=${this._timelineKeys}
            .mini=${true}
            .timelineConfig=${this.timelineConfig}
            .thumbnailConfig=${this.thumbnailConfig}
            .cameraManager=${this.cameraManager}
            .foldersManager=${this.foldersManager}
            .conditionStateManager=${this.conditionStateManager}
            .viewItemManager=${this.viewItemManager}
            .cardWideConfig=${this.cardWideConfig}
          >
          </advanced-camera-card-timeline-core>`
            : ''}
      <slot></slot>
    </advanced-camera-card-surround-basic>`;
    }
    static get styles() {
        return r(css$d);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardSurround.prototype, "thumbnailConfig", void 0);
__decorate([
    n({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardSurround.prototype, "timelineConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "foldersManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "conditionStateManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardSurround.prototype, "cardWideConfig", void 0);
AdvancedCameraCardSurround = __decorate([
    t('advanced-camera-card-surround')
], AdvancedCameraCardSurround);

let AdvancedCameraCardDiagnostics = class AdvancedCameraCardDiagnostics extends s {
    async _renderDiagnostics() {
        const diagnostics = await getDiagnostics(this.hass, this.deviceRegistryManager, this.rawConfig);
        return renderMessage({
            message: localize('error.diagnostics'),
            icon: 'mdi:cogs',
            context: diagnostics,
        });
    }
    render() {
        return x `${m(this._renderDiagnostics(), renderMessage({
            message: localize('error.fetching_diagnostics'),
            dotdotdot: true,
            icon: 'mdi:cogs',
        }))}`;
    }
    static get styles() {
        return r(css$d);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardDiagnostics.prototype, "deviceRegistryManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardDiagnostics.prototype, "rawConfig", void 0);
AdvancedCameraCardDiagnostics = __decorate([
    t('advanced-camera-card-diagnostics')
], AdvancedCameraCardDiagnostics);

let AdvancedCameraCardViews = class AdvancedCameraCardViews extends s {
    willUpdate(changedProps) {
        if (changedProps.has('viewManagerEpoch') || changedProps.has('config')) {
            const view = this.viewManagerEpoch?.manager.getView();
            if (view?.is('live') || this._shouldLivePreload()) {
                import('./index-1c3b9a68.js');
            }
            if (view?.isMediaGalleryView() && !view.is('folders')) {
                import('./media-gallery-7dcb9a0c.js');
            }
            else if (view?.isViewerView()) {
                import('./index-6a2dab01.js');
            }
            else if (view?.is('image')) {
                import('./image-18db5912.js');
            }
            else if (view?.is('timeline')) {
                import('./timeline-a08c2bc1.js');
            }
            else if (view?.is('folders')) {
                import('./folder-gallery-c2d7f825.js');
            }
        }
        if (changedProps.has('hide')) {
            if (this.hide) {
                this.setAttribute('hidden', '');
            }
            else {
                this.removeAttribute('hidden');
            }
        }
    }
    _shouldLivePreload() {
        const view = this.viewManagerEpoch?.manager.getView();
        return (
        // Special case: Never preload for diagnostics -- we want that to be as
        // minimal as possible.
        !!this.config?.live.preload && !view?.is('diagnostics'));
    }
    render() {
        // Only essential items should be added to the below list, since we want the
        // overall views pane to render in ~almost all cases (e.g. for a camera
        // initialization error to display, `view` and `cameraConfig` may both be
        // undefined, but we still want to render).
        if (!this.hass || !this.config || !this.cardWideConfig) {
            return x ``;
        }
        const view = this.viewManagerEpoch?.manager.getView();
        // Render but hide the live view if there's a message, or if it's preload
        // mode and the view is not live.
        const liveClasses = {
            hidden: this._shouldLivePreload() && !view?.is('live'),
        };
        const overallClasses = {
            hidden: !!this.hide,
        };
        const thumbnailConfig = view?.is('live')
            ? this.config.live.controls.thumbnails
            : view?.isViewerView()
                ? this.config.media_viewer.controls.thumbnails
                : view?.is('timeline')
                    ? this.config.timeline.controls.thumbnails
                    : undefined;
        const miniTimelineConfig = view?.is('live')
            ? this.config.live.controls.timeline
            : view?.isViewerView()
                ? this.config.media_viewer.controls.timeline
                : undefined;
        const cameraConfig = view
            ? this.cameraManager?.getStore().getCameraConfig(view.camera) ?? null
            : null;
        return x ` <advanced-camera-card-surround
      class="${e(overallClasses)}"
      .hass=${this.hass}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .thumbnailConfig=${!this.hide ? thumbnailConfig : undefined}
      .timelineConfig=${!this.hide ? miniTimelineConfig : undefined}
      .cameraManager=${this.cameraManager}
      .foldersManager=${this.foldersManager}
      .conditionStateManager=${this.conditionStateManager}
      .viewItemManager=${this.viewItemManager}
      .cardWideConfig=${this.cardWideConfig}
    >
      ${!this.hide && view?.is('image') && cameraConfig
            ? x ` <advanced-camera-card-image
            .imageConfig=${this.config.image}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .hass=${this.hass}
            .cameraConfig=${cameraConfig}
            .cameraManager=${this.cameraManager}
          >
          </advanced-camera-card-image>`
            : ``}
      ${!this.hide && view?.isMediaGalleryView() && !view.is('folders')
            ? x ` <advanced-camera-card-media-gallery
            .hass=${this.hass}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .galleryConfig=${this.config.media_gallery}
            .cameraManager=${this.cameraManager}
            .viewItemManager=${this.viewItemManager}
            .cardWideConfig=${this.cardWideConfig}
          >
          </advanced-camera-card-media-gallery>`
            : ``}
      ${!this.hide && view?.isViewerView()
            ? x `
            <advanced-camera-card-viewer
              .hass=${this.hass}
              .viewManagerEpoch=${this.viewManagerEpoch}
              .viewerConfig=${this.config.media_viewer}
              .resolvedMediaCache=${this.resolvedMediaCache}
              .cameraManager=${this.cameraManager}
              .cardWideConfig=${this.cardWideConfig}
            >
            </advanced-camera-card-viewer>
          `
            : ``}
      ${!this.hide && view?.is('timeline')
            ? x ` <advanced-camera-card-timeline
            .hass=${this.hass}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .timelineConfig=${this.config.timeline}
            .cameraManager=${this.cameraManager}
            .conditionStateManager=${this.conditionStateManager}
            .foldersManager=${this.foldersManager}
            .viewItemManager=${this.viewItemManager}
            .cardWideConfig=${this.cardWideConfig}
          >
          </advanced-camera-card-timeline>`
            : ``}
      ${!this.hide && view?.is('diagnostics')
            ? x ` <advanced-camera-card-diagnostics
            .hass=${this.hass}
            .rawConfig=${this.rawConfig}
            .deviceRegistryManager=${this.deviceRegistryManager}
          >
          </advanced-camera-card-diagnostics>`
            : ``}
      ${!this.hide && view?.is('folders')
            ? x ` <advanced-camera-card-folder-gallery
            .hass=${this.hass}
            .viewManagerEpoch=${this.viewManagerEpoch}
            .viewItemManager=${this.viewItemManager}
            .galleryConfig=${this.config.media_gallery}
            .foldersManager=${this.foldersManager}
          ></advanced-camera-card-folder-gallery>`
            : ``}
      ${
        // Note: Subtle difference in condition below vs the other views in
        // order to always render the live view for live.preload mode.
        this._shouldLivePreload() || (!this.hide && view?.is('live'))
            ? x `
              <advanced-camera-card-mini-live
                .hass=${this.hass}
                .viewManagerEpoch=${this.viewManagerEpoch}
                .liveConfig=${this.config.live}
                .cameraManager=${this.cameraManager}
                .cardWideConfig=${this.cardWideConfig}
                .microphoneState=${this.microphoneState}
                .triggeredCameraIDs=${this.triggeredCameraIDs}
                class="${e(liveClasses)}"
              >
              </advanced-camera-card-mini-live>
            `
            : ``}
    </advanced-camera-card-surround>`;
    }
    static get styles() {
        return r(css$3);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "foldersManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "config", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "rawConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "resolvedMediaCache", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "hide", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "microphoneState", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "triggeredCameraIDs", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "deviceRegistryManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViews.prototype, "conditionStateManager", void 0);
AdvancedCameraCardViews = __decorate([
    t('advanced-camera-card-mini-views')
], AdvancedCameraCardViews);

// ***************************************************************************
//                         General Card-Wide Notes
// ***************************************************************************
/** Media callbacks:
 *
 * Media elements (e.g. <video>, <img> or <canvas>) need to callback when:
 *  - Metadata is loaded / dimensions are known (for aspect-ratio)
 *  - Media is playing / paused (to avoid reloading)
 *
 * A number of different approaches used to attach event handlers to
 * get these callbacks (which need to be attached directly to the media
 * elements, which may be 'buried' down the DOM):
 *  - Extend the `ha-hls-player` and `ha-camera-stream` to specify the required
 *    hooks (as querySelecting the media elements after rendering was a fight
 *    with the Lit rendering engine and was very fragile) .
 *  - For non-Lit elements (e.g. WebRTC) query selecting after rendering.
 *  - Library provided hooks (e.g. JSMPEG)
 *  - Directly specifying hooks (e.g. for snapshot viewing with simple <img> tags)
 */
// ***************************************************************************
//                          Static Initializers
// ***************************************************************************
console.info(`%c ðŸ“· Advanced Camera Card %c ${getReleaseVersion()} `, 'padding: 3px; color: black; background: pink;', 'padding: 3px; color: black; background: white;');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.customCards = window.customCards || [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.customCards.push({
    type: 'advanced-camera-card-mini',
    name: 'Advanced Camera Card Mini',
    description: 'Lightweight fork optimized for weaker devices',
    preview: true,
    documentationURL: REPO_URL,
});
// ***************************************************************************
//                    Main AdvancedCameraCard WebComponent
//
// Any non-rendering / non-lit related functionality should be added to
// CardController instead of this file.
// ***************************************************************************
let AdvancedCameraCard = class AdvancedCameraCard extends s {
    constructor() {
        super(...arguments);
        this._controller = new CardController(this, 
        // Callback to scroll the main pane back to the top (example usecase: scrolling
        // half way down the gallery, then viewing diagnostics should result in
        // diagnostics starting at the top).
        () => this._refMain.value?.scroll({ top: 0 }), () => this._refMenu.value?.toggleMenu(), () => this._refEffects.value ?? null);
        this._menuButtonController = new MenuButtonController();
        this._refEffects = e$1();
        this._refElements = e$1();
        this._refMain = e$1();
        this._refMenu = e$1();
        this._refOverlay = e$1();
        this._refViews = e$1();
    }
    // Convenience methods for very frequently accessed attributes.
    get _config() {
        return this._controller.getConfigManager().getConfig();
    }
    get _hass() {
        return this._controller.getHASSManager().getHASS();
    }
    set hass(hass) {
        this._controller.getHASSManager().setHASS(hass);
        // Manually set hass in the menu, elements and image. This is to allow these
        // to update, without necessarily re-rendering the entire card (re-rendering
        // is expensive).
        if (this._refMenu.value) {
            this._refMenu.value.hass = hass;
        }
        if (this._refElements.value) {
            this._refElements.value.hass = hass;
        }
        if (this._refViews.value) {
            this._refViews.value.hass = hass;
        }
    }
    set isPanel(isPanel) {
        this._controller.getConditionStateManager().setState({
            panel: isPanel,
        });
    }
    get isPanel() {
        return !!this._controller.getConditionStateManager().getState().panel;
    }
    static async getConfigElement() {
        return await CardController.getConfigElement();
    }
    static getStubConfig(_, entities) {
        return CardController.getStubConfig(entities);
    }
    setConfig(config) {
        this._controller.getConfigManager().setConfig(config);
    }
    shouldUpdate() {
        // Do not allow a disconnected element to update, as it may cause cameras to
        // reinitialize/subscribe for an element that is no longer part of the
        // document.
        if (!this.isConnected) {
            return false;
        }
        // Always allow messages to render, as a message may be generated during
        // initialization.
        if (this._controller.getMessageManager().hasMessage()) {
            return true;
        }
        if (!this._controller.getInitializationManager().isInitializedMandatory()) {
            this._controller.getInitializationManager().initializeMandatory();
        }
        return true;
    }
    _renderMenuStatusContainer(position) {
        if (!this._config) {
            return;
        }
        const menuStyle = this._config.menu.style;
        const menuPosition = this._config.menu.position;
        const statusBarStyle = this._config.status_bar.style;
        const statusBarPosition = this._config.status_bar.position;
        if (
        // If there's nothing to render...
        (menuStyle === 'none' && statusBarStyle === 'none') ||
            // ... or the position I'm rendering does not contain the menu/status bar
            (position === 'overlay' &&
                menuStyle === 'outside' &&
                statusBarStyle === 'outside') ||
            (position !== 'overlay' &&
                (menuStyle !== 'outside' || menuPosition !== position) &&
                (statusBarStyle !== 'outside' || statusBarPosition !== position))) {
            // ... then there's nothing to do.
            return;
        }
        const getContents = (kind) => {
            const shouldRenderMenu = menuStyle !== 'none' &&
                ((menuStyle === 'outside' && kind === 'outerlay' && menuPosition === position) ||
                    (menuStyle !== 'outside' && kind === 'overlay'));
            const shouldRenderStatusBar = statusBarStyle !== 'none' &&
                ((statusBarStyle === 'outside' &&
                    kind === 'outerlay' &&
                    statusBarPosition === position) ||
                    (statusBarStyle !== 'outside' && kind === 'overlay'));
            // Complex logic to try to always put the menu in the right-looking place.
            const renderMenuFirst = menuPosition === 'left' ||
                menuPosition === 'right' ||
                (menuPosition === 'bottom' &&
                    menuStyle === 'hidden' &&
                    statusBarStyle !== 'popup') ||
                (menuPosition === 'top' && statusBarStyle === 'popup');
            return x `
        ${shouldRenderMenu && renderMenuFirst ? this._renderMenu(menuPosition) : ''}
        ${shouldRenderStatusBar ? this._renderStatusBar(statusBarPosition) : ''}
        ${shouldRenderMenu && !renderMenuFirst ? this._renderMenu(menuPosition) : ''}
      `;
        };
        return x `
      ${position === 'overlay'
            ? x `<advanced-camera-card-overlay
            >${getContents('overlay')}</advanced-camera-card-overlay
          >`
            : x `<div class="outerlay" data-position="${position}">
            ${getContents('outerlay')}
          </div>`}
    `;
    }
    _renderMenu(slot) {
        const view = this._controller.getViewManager().getView();
        if (!this._hass || !this._config) {
            return;
        }
        return x `
      <advanced-camera-card-menu
        ${n$1(this._refMenu)}
        slot=${o(slot)}
        .hass=${this._hass}
        .menuConfig=${this._config.menu}
        .buttons=${this._menuButtonController.calculateButtons(this._hass, this._config, this._controller.getCameraManager(), this._controller.getFoldersManager(), {
            currentMediaLoadedInfo: this._controller.getMediaLoadedInfoManager().get(),
            fullscreenManager: this._controller.getFullscreenManager(),
            inExpandedMode: this._controller.getExpandManager().isExpanded(),
            mediaPlayerController: this._controller.getMediaPlayerManager(),
            microphoneManager: this._controller.getMicrophoneManager(),
            showCameraUIButton: this._controller.getCameraURLManager().hasCameraURL(),
            view: view,
            viewManager: this._controller.getViewManager(),
        })}
        .entityRegistryManager=${this._controller.getEntityRegistryManager()}
      ></advanced-camera-card-menu>
    `;
    }
    _renderStatusBar(slot) {
        if (!this._config) {
            return;
        }
        return x `
      <advanced-camera-card-status-bar
        slot=${o(slot)}
        .items=${this._controller.getStatusBarItemManager().calculateItems({
            statusConfig: this._config.status_bar,
            cameraManager: this._controller.getCameraManager(),
            view: this._controller.getViewManager().getView(),
            mediaLoadedInfo: this._controller.getMediaLoadedInfoManager().get(),
        })}
        .config=${this._config.status_bar}
      ></advanced-camera-card-status-bar>
    `;
    }
    updated() {
        if (this._controller.getInitializationManager().isInitializedMandatory()) {
            this._controller.getQueryStringManager().executeIfNecessary();
        }
    }
    _renderInDialogIfNecessary(contents) {
        if (this._controller.getExpandManager().isExpanded()) {
            return x ` <web-dialog
        open
        center
        @close=${() => {
                this._controller.getExpandManager().setExpanded(false);
            }}
      >
        ${contents}
      </web-dialog>`;
        }
        else {
            return contents;
        }
    }
    render() {
        if (!this._hass) {
            return;
        }
        const outerlayUsed = this._config?.menu.style === 'outside' ||
            this._config?.status_bar.style === 'outside';
        const mainClasses = {
            main: true,
            'curve-top': !outerlayUsed ||
                (this._config?.menu.position !== 'top' &&
                    this._config?.status_bar.position !== 'top'),
            'curve-bottom': !outerlayUsed ||
                (this._config?.menu.position !== 'bottom' &&
                    this._config?.status_bar.position !== 'bottom'),
        };
        const actions = this._controller.getActionsManager().getMergedActions();
        const cameraManager = this._controller.getCameraManager();
        const showLoading = this._config?.performance?.features.card_loading_indicator !== false &&
            !this._controller.getMessageManager().hasMessage();
        // Caution: Keep the main div and the menu next to one another in order to
        // ensure the hover menu styling continues to work.
        return this._renderInDialogIfNecessary(x ` <advanced-camera-card-effects
          ${n$1(this._refEffects)}
        ></advanced-camera-card-effects>
        <ha-card
          id="ha-card"
          .actionHandler=${actionHandler({
            hasHold: hasAction(actions.hold_action),
            hasDoubleClick: hasAction(actions.double_tap_action),
        })}
          style="${o$1(this._controller.getStyleManager().getAspectRatioStyle())}"
          @advanced-camera-card:message=${(ev) => this._controller.getMessageManager().setMessageIfHigherPriority(ev.detail)}
          @advanced-camera-card:media:loaded=${(ev) => this._controller.getMediaLoadedInfoManager().set(ev.detail)}
          @advanced-camera-card:media:unloaded=${() => this._controller.getMediaLoadedInfoManager().clear()}
          @advanced-camera-card:media:volumechange=${() => this.requestUpdate() /* Refresh mute menu button */}
          @advanced-camera-card:media:play=${() => this.requestUpdate() /* Refresh play/pause menu button */}
          @advanced-camera-card:media:pause=${() => this.requestUpdate() /* Refresh play/pause menu button */}
          @advanced-camera-card:focus=${() => this.focus()}
        >
          ${showLoading
            ? x `<advanced-camera-card-loading
                .loaded=${this._controller
                .getInitializationManager()
                .wasEverInitialized()}
                .effectsControllerAPI=${this._config?.performance?.features
                .card_loading_effects !== false
                ? this._controller.getEffectsControllerAPI()
                : undefined}
              ></advanced-camera-card-loading>`
            : ''}
          ${this._renderMenuStatusContainer('top')}
          ${this._renderMenuStatusContainer('overlay')}
          <div ${n$1(this._refMain)} class="${e(mainClasses)}">
            <advanced-camera-card-mini-views
              ${n$1(this._refViews)}
              .hass=${this._hass}
              .viewManagerEpoch=${this._controller.getViewManager().getEpoch()}
              .cameraManager=${cameraManager}
              .foldersManager=${this._controller.getFoldersManager()}
              .viewItemManager=${this._controller.getViewItemManager()}
              .resolvedMediaCache=${this._controller.getResolvedMediaCache()}
              .config=${this._controller.getConfigManager().getConfig()}
              .cardWideConfig=${this._controller.getConfigManager().getCardWideConfig()}
              .rawConfig=${this._controller.getConfigManager().getRawConfig()}
              .configManager=${this._controller.getConfigManager()}
              .hide=${!!this._controller.getMessageManager().hasMessage()}
              .microphoneState=${this._controller.getMicrophoneManager().getState()}
              .conditionStateManager=${this._controller.getConditionStateManager()}
              .triggeredCameraIDs=${this._config?.view.triggers.show_trigger_status
            ? this._controller.getTriggersManager().getTriggeredCameraIDs()
            : undefined}
              .deviceRegistryManager=${this._controller.getDeviceRegistryManager()}
            ></advanced-camera-card-mini-views>
            ${this._controller.getMessageManager().hasMessage()
            ? // Keep message rendering to last to show messages that may have been
                // generated during the render.
                renderMessage(this._controller.getMessageManager().getMessage())
            : ''}
          </div>
          ${this._renderMenuStatusContainer('bottom')}
          ${this._config?.elements
            ? // Elements need to render after the main views so it can render 'on
                // top'.
                x ` <advanced-camera-card-elements
                ${n$1(this._refElements)}
                .hass=${this._hass}
                .elements=${this._config?.elements}
                .conditionStateManager=${this._controller.getConditionStateManager()}
                @advanced-camera-card:menu:add=${(ev) => {
                    this._menuButtonController.addDynamicMenuButton(ev.detail);
                    this.requestUpdate();
                }}
                @advanced-camera-card:menu:remove=${(ev) => {
                    this._menuButtonController.removeDynamicMenuButton(ev.detail);
                    this.requestUpdate();
                }}
                @advanced-camera-card:status-bar:add=${(ev) => {
                    this._controller
                        .getStatusBarItemManager()
                        .addDynamicStatusBarItem(ev.detail);
                }}
                @advanced-camera-card:status-bar:remove=${(ev) => {
                    this._controller
                        .getStatusBarItemManager()
                        .removeDynamicStatusBarItem(ev.detail);
                }}
                @advanced-camera-card:condition-state-manager:get=${(ev) => {
                    ev.conditionStateManager = this._controller.getConditionStateManager();
                }}
              >
              </advanced-camera-card-elements>`
            : ``}
        </ha-card>`);
    }
    static get styles() {
        return r(css$e);
    }
    getCardSize() {
        // This method is called before the card is rendered. As such, we don't
        // actually know what height the card will end up being, and for this card
        // it may change significantly with usage. As such, we just return a fixed
        // size guess (stock HA cards, such as the picture glance card, do similar).
        // Lovelace card size is expressed in units of 50px. A 16:9 aspect-ratio
        // camera will likely render as a 276.75px height masonary card => 5.52
        // units of 50, round up to 6.
        return 6;
    }
};
AdvancedCameraCard = __decorate([
    t('advanced-camera-card-mini')
], AdvancedCameraCard);

export { getUpFolderMediaItem as g, upFolderClickHandler as u };
//# sourceMappingURL=card-24c0ec1d.js.map
