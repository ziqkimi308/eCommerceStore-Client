import Slider from "rc-slider";

export default function PriceRangeSlider({
	minValue,
	maxValue,
	value,
	handleChange,
	step
}) {
	return (
		<>
			<Slider
				range
				min={minValue}
				max={maxValue}
				defaultValue={value}
				onChange={handleChange}
				step={step}
			/>
		</>
	);
}
