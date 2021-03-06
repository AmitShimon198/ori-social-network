class CameraService {
    static instance: CameraService;
    static getInstance(): CameraService {
        if (!CameraService.instance) {
            CameraService.instance = new CameraService()
        }
        return CameraService.instance;
    }
    async getVideo(constraints?: MediaStreamConstraints | undefined, onSuccess?: (stream: MediaStream) => void, onError?: (error: Error) => void) {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (typeof onSuccess === 'function') {
                onSuccess(stream)
            }
            return stream;
        } catch (error: any) {
            if (typeof onError === 'function') {
                onError(error)
            }
        }
    }
    saveImage(video: any, photo: any, onSuccess?: () => void, onError?: (error: Error) => void): void {
        try {
            const width = 414;
            const height = width / (16 / 9);
            photo.width = width;
            photo.height = height;
            const ctx = photo.getContext('2d');
            ctx.drawImage(video, 0, 0, width, height);
            const base64 = this._toBase64(photo);

            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        } catch (error: any) {
            if (typeof onError === 'function') {
                onError(error);
            }
        }
    }
    clearImage(photo: any, onSuccess?: () => void, onError?: (error: Error) => void) {
        try {
            const ctx = photo.getContext('2d');
            ctx.clearRect(0, 0, photo.width, photo.height);
            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        } catch (error: any) {
            if (typeof onError === 'function') {
                onError(error);
            }
        }
    }

    _onVideoStart(video: any) {
        video.play();
    }

    _onVideoPause(video: any) {
        video.pause();
    }

    handleVideoActiveState(video: any, isPlaying: boolean) {
        if (isPlaying) {
            this._onVideoPause(video)
        } else {
            this._onVideoStart(video)
        }
    }

    _toBase64(video: any) {
        try {
            return video.toDataURL("image/png");
        } catch (error: any) {
            console.error('[dataURItoBlob]', error.message);
        }
    }

}

export default CameraService.getInstance()