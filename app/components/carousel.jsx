'use client';

import { useState, useEffect, useRef } from "react";

const Carousel = () => {
    const slides = [
        { id: 1, title: "Slide 1", bg: "#FF6B6B" },
        { id: 2, title: "Slide 2", bg: "#4ECDC4" },
        { id: 3, title: "Slide 3", bg: "#556270" },
        { id: 4, title: "Slide 4", bg: "#C7F464" },
        { id: 5, title: "Slide 5", bg: "#FFA07A" }
    ];

    const [index, setIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);
    const trackRef = useRef(null);
    const touchStartX = useRef(0);
    const touchDelta = useRef(0);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setItemsToShow(3);
            else if (w >= 768) setItemsToShow(2);
            else setItemsToShow(1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Keep index valid when itemsToShow changes
    useEffect(() => {
        const maxIndex = Math.max(0, slides.length - itemsToShow);
        if (index > maxIndex) setIndex(maxIndex);
    }, [itemsToShow, index, slides.length]);

    // autoplay
    useEffect(() => {
        const id = setInterval(() => {
            const maxIndex = Math.max(0, slides.length - itemsToShow);
            setIndex((i) => (i >= maxIndex ? 0 : i + 1));
        }, 4000);
        return () => clearInterval(id);
    }, [itemsToShow, slides.length]);

    const prev = () => {
        setIndex((i) => Math.max(0, i - 1));
    };
    const next = () => {
        const maxIndex = Math.max(0, slides.length - itemsToShow);
        setIndex((i) => Math.min(maxIndex, i + 1));
    };

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDelta.current = 0;
    };
    const onTouchMove = (e) => {
        touchDelta.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        const threshold = 50;
        if (touchDelta.current > threshold) prev();
        else if (touchDelta.current < -threshold) next();
    };

    const slideWidth = 100 / itemsToShow;
    const maxIndex = Math.max(0, slides.length - itemsToShow);

    return (
        <div className="w-full max-w-[1000px] mx-auto p-3 box-border relative">
            <div
                className="overflow-hidden rounded-lg w-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    ref={trackRef}
                    style={{
                        width: `${(slides.length * 100) / itemsToShow}%`,
                        transform: `translateX(-${index * slideWidth}%)`
                    }}
                >
                    {slides.map((s) => (
                        <div
                            key={s.id}
                            className="flex-none h-56 md:h-64 lg:h-72 flex items-center justify-center text-white text-lg select-none"
                            style={{ width: `${slideWidth}%`, background: s.bg }}
                            aria-hidden={false}
                        >
                            <div className="px-4 py-2 bg-black bg-opacity-25 rounded-md">
                                {s.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className={`btn btn-circle absolute top-1/2 transform -translate-y-1/2 left-4 sm:left-6 ${index === 0 ? "opacity-50 cursor-default" : ""}`}
                onClick={prev}
                aria-label="Previous"
                disabled={index === 0}
            >
                ‹
            </button>

            <button
                className={`btn btn-circle absolute top-1/2 transform -translate-y-1/2 right-4 sm:right-6 ${index === maxIndex ? "opacity-50 cursor-default" : ""}`}
                onClick={next}
                aria-label="Next"
                disabled={index === maxIndex}
            >
                ›
            </button>

            <div className="flex gap-2 justify-center mt-3">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        className={`w-2 h-2 rounded-full border-0 ${i === index ? "bg-gray-800" : "bg-gray-300"}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
