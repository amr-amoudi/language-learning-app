export default function DeckName({ children }: { children: React.ReactNode }) {
    return (
        <div className={'overflow-hidden text-center'}>
            <h1>{ children }</h1>
        </div>
    )
}


