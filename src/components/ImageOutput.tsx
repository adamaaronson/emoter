import { useRef, useState } from "react";
import "../styles/ImageOutput.scss";

interface Props {
    imageText: string;
    settings: Settings;
    setSetting: (setting: Partial<Settings>) => void;
}

export interface Settings {
    fontSize: string;
    font: Font;
    textColor: string;
    backgroundColor: string;
    textAlignment: TextAlignment;
    allCaps: boolean;
    borderRadius: string;
}

export enum TextAlignment {
    Center = "center",
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
    TopLeft = "topleft",
    TopRight = "topright",
    BottomLeft = "bottomleft",
    BottomRight = "bottomright",
}

const FONTS = [
    "Concert One",
    "Arial",
    "Courier New",
    "Impact",
    "Times New Roman",
] as const;

type Font = (typeof FONTS)[number];

const FONT_VERTICAL_OFFSETS: Record<Font, number> = {
    "Concert One": -0.05,
    Arial: 0.01,
    "Courier New": 0.03,
    Impact: 0,
    "Times New Roman": 0,
};

export function ImageOutput({ imageText, settings, setSetting }: Props) {
    const [draggingText, setDraggingText] = useState(false);
    const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });
    const [textDragOrigin, setTextDragOrigin] = useState({ x: 0, y: 0 });
    const [textOffsetAtOrigin, setTextOffsetAtOrigin] = useState({
        x: 0,
        y: 0,
    });

    const imageTextRef = useRef<HTMLSpanElement | null>(null);

    const getFontSizeStyle = () => {
        return { fontSize: `${Math.pow(parseFloat(settings.fontSize), 2)}em` };
    };

    const getTextAlignmentStyle = () => {
        switch (settings.textAlignment) {
            case TextAlignment.Center:
                return {
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center" as const,
                };
            case TextAlignment.Top:
                return {
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlign: "center" as const,
                };
            case TextAlignment.Bottom:
                return {
                    justifyContent: "center",
                    alignItems: "flex-end",
                    textAlign: "center" as const,
                };
            case TextAlignment.Left:
                return {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "left" as const,
                };
            case TextAlignment.Right:
                return {
                    justifyContent: "flex-end",
                    alignItems: "center",
                    textAlign: "right" as const,
                };
            case TextAlignment.TopLeft:
                return {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left" as const,
                };
            case TextAlignment.TopRight:
                return {
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    textAlign: "right" as const,
                };
            case TextAlignment.BottomLeft:
                return {
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    textAlign: "left" as const,
                };
            case TextAlignment.BottomRight:
                return {
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    textAlign: "right" as const,
                };
        }
    };

    const startDraggingText = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!imageTextRef.current) {
            return;
        }
        const imageTextRect = imageTextRef.current.getBoundingClientRect();
        if (
            event.clientX < imageTextRect.left ||
            event.clientX > imageTextRect.right ||
            event.clientY < imageTextRect.top ||
            event.clientY > imageTextRect.bottom
        ) {
            return;
        }
        setDraggingText(true);
        setTextDragOrigin({
            x: event.clientX,
            y: event.clientY,
        });
        setTextOffsetAtOrigin({
            x: textOffset.x,
            y: textOffset.y,
        });
    };
    const dragText = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (draggingText) {
            setTextOffset({
                x: event.clientX + textOffsetAtOrigin.x - textDragOrigin.x,
                y: event.clientY + textOffsetAtOrigin.y - textDragOrigin.y,
            });
        }
    };
    const stopDraggingText = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDraggingText(false);
    };
    const resetTextOffset = () => {
        setTextOffset({ x: 0, y: 0 });
        setTextOffsetAtOrigin({ x: 0, y: 0 });
        setTextDragOrigin({ x: 0, y: 0 });
    };

    return (
        <div className="image-output-wrapper full-width-box">
            <div
                className="image-output"
                id="image-output"
                style={{
                    borderRadius: `${settings.borderRadius}px`,
                    backgroundColor: settings.backgroundColor,
                }}
            >
                <div
                    className="image-text-wrapper"
                    onPointerDown={startDraggingText}
                    onPointerMove={dragText}
                    onPointerUp={stopDraggingText}
                    onPointerLeave={stopDraggingText}
                    style={{
                        translate: `${textOffset.x}px ${textOffset.y}px`,
                    }}
                >
                    <div
                        className="image-text"
                        style={{
                            color: settings.textColor,
                            fontFamily: settings.font,
                            fontWeight:
                                settings.font === "Concert One"
                                    ? "normal"
                                    : "bold",
                            transform: `translate(0, ${
                                FONT_VERTICAL_OFFSETS[settings.font]
                            }em)`,
                            textTransform: settings.allCaps
                                ? "uppercase"
                                : "none",
                            ...getFontSizeStyle(),
                            ...getTextAlignmentStyle(),
                        }}
                    >
                        <span className="image-text-span" ref={imageTextRef}>
                            {imageText || "wow!"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="settings-wrapper">
                <div className="settings-item">
                    <div className="settings-item-name">Text color:</div>
                    <input
                        className="settings-item-input"
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => {
                            setSetting({ textColor: e.target.value });
                        }}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Background color:</div>
                    <input
                        className="settings-item-input"
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => {
                            setSetting({ backgroundColor: e.target.value });
                        }}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Font:</div>
                    <select
                        className="settings-item-input"
                        value={settings.font}
                        onChange={(e) => {
                            setSetting({ font: e.target.value as Font });
                        }}
                    >
                        {FONTS.map((font) => (
                            <option value={font} key={font}>
                                {font}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Font size:</div>
                    <input
                        className="settings-item-input"
                        type="range"
                        min="0.4"
                        max="1.8"
                        step="0.01"
                        onChange={(e) => {
                            setSetting({ fontSize: e.target.value });
                        }}
                        defaultValue={settings.fontSize}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Border radius:</div>
                    <input
                        className="settings-item-input"
                        type="range"
                        min="0"
                        max="64"
                        step="16"
                        onChange={(e) => {
                            setSetting({ borderRadius: e.target.value });
                        }}
                        defaultValue={settings.borderRadius}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Align text:</div>
                    <select
                        className="settings-item-input"
                        value={settings.textAlignment}
                        onChange={(e) => {
                            resetTextOffset();
                            setSetting({
                                textAlignment: e.target.value as TextAlignment,
                            });
                        }}
                    >
                        <option value={TextAlignment.Center}>Center</option>
                        <option value={TextAlignment.Top}>Top</option>
                        <option value={TextAlignment.Bottom}>Bottom</option>
                        <option value={TextAlignment.Left}>Left</option>
                        <option value={TextAlignment.Right}>Right</option>
                        <option value={TextAlignment.TopLeft}>Top left</option>
                        <option value={TextAlignment.TopRight}>
                            Top right
                        </option>
                        <option value={TextAlignment.BottomLeft}>
                            Bottom left
                        </option>
                        <option value={TextAlignment.BottomRight}>
                            Bottom right
                        </option>
                    </select>
                </div>

                <div className="settings-item">
                    <div className="settings-item-name">All caps:</div>
                    <input
                        className="settings-item-input"
                        type="checkbox"
                        checked={settings.allCaps}
                        onChange={(_e) => {
                            setSetting({ allCaps: !settings.allCaps });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
