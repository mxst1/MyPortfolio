import { useRef } from "react";
// import { useStackMarquee } from "../scripts/useStackMarquee";
import "../index.css";

export default function StackMarquee({ onIconClick, items }) {
	const iconRefs = useRef([]);

	const defaultIcons = [
		"/icons/html.svg",
		"/icons/css.svg",
		"/icons/js.svg",
		"/icons/python.svg",
		"/icons/react.svg",
		"/icons/node.svg",
	];

	const normalized = (items && items.length)
		? items.map((it) => (typeof it === "string" ? { src: it, title: "", description: "" } : it))
		: defaultIcons.map((src) => ({ src, title: "", description: "" }));

	// useStackMarquee(iconRefs);

	return (
		<div className="stack-marquee">
			<div className="stack-track">
				{normalized.map((item, i) => (
					<img
						key={i}
						src={item.src}
						ref={el => (iconRefs.current[i] = el)}
						alt={item.title || ""}
						draggable={false}
						onClick={() => onIconClick && onIconClick(item)}
						style={{ cursor: onIconClick ? "pointer" : "default" }}
					/>
				))}
			</div>
		</div>
	);
}
