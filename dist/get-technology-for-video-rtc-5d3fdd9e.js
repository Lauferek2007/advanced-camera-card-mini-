const getTechnologyForVideoRTC = (element) => {
    const tech = [
        ...(!!element.pc ? ['webrtc'] : []),
        ...(!element.pc && element.mseCodecs ? ['mse', 'hls'] : []),
    ];
    return tech.length ? tech : undefined;
};

export { getTechnologyForVideoRTC as g };
//# sourceMappingURL=get-technology-for-video-rtc-5d3fdd9e.js.map
