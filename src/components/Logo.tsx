interface LogoProps {
    size?: number;
    showText?: boolean;
    textColor?: string;
}

export default function Logo({ size = 36, showText = true, textColor = '#3d5a6b' }: LogoProps) {
    return (
        <div className="flex items-center gap-2.5">
            {/* Circle icon — garpu & sendok */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer ring */}
                <circle cx="50" cy="50" r="44" stroke="#e05c2a" strokeWidth="7" fill="none" />

                {/* Fork (left side) */}
                {/* Tines */}
                <line x1="36" y1="20" x2="36" y2="38" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="41" y1="20" x2="41" y2="38" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="46" y1="20" x2="46" y2="38" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" />
                {/* Fork neck */}
                <path d="M36 38 Q41 44 41 48 L41 78" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M46 38 Q41 44 41 48" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                {/* Spoon (right side) */}
                {/* Spoon bowl */}
                <ellipse cx="62" cy="30" rx="8" ry="11" stroke="#e05c2a" strokeWidth="3.5" fill="none" />
                {/* Spoon handle */}
                <line x1="62" y1="41" x2="62" y2="78" stroke="#e05c2a" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            {/* Brand name */}
            {showText && (
                <span
                    className="font-bold tracking-tight"
                    style={{ color: textColor, fontSize: size * 0.47 }}
                >
                    kateringnesia
                </span>
            )}
        </div>
    );
}
