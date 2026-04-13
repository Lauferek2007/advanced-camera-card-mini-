declare global {
  interface Window {
    __advancedCameraCardMiniSafeDefineInstalled__?: boolean;
  }
}

if (!window.__advancedCameraCardMiniSafeDefineInstalled__) {
  const originalDefine = window.customElements.define.bind(window.customElements);

  window.customElements.define = ((
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
  ): void => {
    if (window.customElements.get(name)) {
      return;
    }
    originalDefine(name, constructor, options);
  }) as CustomElementRegistry['define'];

  window.__advancedCameraCardMiniSafeDefineInstalled__ = true;
}

export {};
