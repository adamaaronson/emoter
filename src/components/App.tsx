import { useState } from "react";
import html2canvas from "html2canvas";
import "../styles/App.scss";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Settings, TextAlignment, ImageOutput } from "./ImageOutput";
import { ImageModal } from "./ImageModal";

function App() {
    const [imageText, setImageText] = useState("");
    const [emoteImageUrl, setEmoteImageUrl] = useState("");
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [settings, setSettings] = useState<Settings>({
        fontSize: "0.8",
        borderRadius: "0",
        font: "Concert One",
        textColor: "#fafafa",
        backgroundColor: "#2a9fd6",
        textAlignment: TextAlignment.Center,
        allCaps: true,
    });

    const removePartialPixels = () => {
        const imageOutput = document.getElementById("image-output");
        if (imageOutput) {
            const width = imageOutput.getBoundingClientRect().width;
            const height = imageOutput.getBoundingClientRect().height;
            imageOutput.style.width = Math.floor(width) + "px";
            imageOutput.style.height = Math.floor(height) + "px";
        }
    };

    const undoRemovePartialPixels = () => {
        const imageOutput = document.getElementById("image-output");
        if (imageOutput) {
            imageOutput.style.width = "";
            imageOutput.style.height = "";
        }
    };

    const downloadImage = () => {
        removePartialPixels();

        html2canvas(document.getElementById("image-output")!, {
            allowTaint: true,
            useCORS: true,
            scale: 1,
            backgroundColor: null,
        }).then(function (canvas) {
            setEmoteImageUrl(canvas.toDataURL("image/png"));
            setImageModalVisible(true);
            undoRemovePartialPixels();
        });
    };

    return (
        <div className="app-wrapper">
            <div className="app">
                <Header />
                <section className="input-section">
                    <div className="text-field-wrapper field-wrapper">
                        <label htmlFor="text-field" className="field-label">
                            Enter text:
                        </label>
                        <textarea
                            id="text-field"
                            className="text-field full-width-box"
                            placeholder="blah blah blah"
                            value={imageText}
                            onChange={(e) => setImageText(e.target.value)}
                        />
                    </div>
                    <div className="image-field-wrapper field-wrapper">
                        <div className="field-label">Preview:</div>
                        <ImageOutput
                            imageText={imageText}
                            settings={settings}
                            setSetting={(setting) =>
                                setSettings({ ...settings, ...setting })
                            }
                        />
                    </div>
                </section>
                <section className="download-section">
                    <button
                        className="download-image-button"
                        onClick={() => downloadImage()}
                    >
                        Generate emoji
                    </button>
                </section>
                {imageModalVisible && (
                    <ImageModal
                        imageUrl={emoteImageUrl}
                        onCloseModal={() => setImageModalVisible(false)}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default App;
