

export default function BoxSkeleton({w, h, border, styles}: {w: string, h: string, border?:string, styles?: React.CSSProperties}) {
    return (
        <div
            className="rounded-md flex justify-center items-center skeleton"
            style={{ width: w, height: h, border: border ? border : '', ...styles}}
        >
            <div className={"skeleton skeleton-text"}></div>
        </div>
    );
}
