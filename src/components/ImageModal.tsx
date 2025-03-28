import "../styles/ImageModal.scss";

interface Props {
    imageUrl: string;
    onCloseModal: () => void;
}

export function ImageModal({ imageUrl, onCloseModal }: Props) {
    const canShare = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(
        navigator.userAgent
    );

    const shareImage = async () => {
        const blob = await fetch(imageUrl).then((response) => response.blob());
        navigator.share({
            files: [new File([blob], "emoji.png", { type: blob.type })],
        });
    };

    return (
        <div className="image-modal-wrapper" onClick={onCloseModal}>
            <div
                className="image-modal"
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                    e.stopPropagation()
                }
            >
                <div className="image-modal-header">
                    <div className="image-modal-header-text">
                        <h4 className="image-modal-title">
                            Here is your custom emoji:
                        </h4>
                        <h5 className="image-modal-subtitle">
                            Make sure to save it!
                        </h5>
                    </div>

                    <button
                        className="image-modal-close-button"
                        onClick={onCloseModal}
                    >
                        ×
                    </button>
                </div>
                <div className="image-modal-output">
                    <img
                        className="image-modal-output-image"
                        src={imageUrl}
                        alt="emoji"
                        crossOrigin="anonymous"
                    />
                </div>
                <div className="image-modal-footer">
                    <div className="image-modal-download-button-wrapper">
                        {canShare ? (
                            <button
                                onClick={shareImage}
                                className="image-modal-download-button"
                            >
                                Download
                            </button>
                        ) : (
                            <a
                                href={imageUrl}
                                className="image-modal-download-button"
                                download
                            >
                                Download
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
