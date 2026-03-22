import { useState } from 'react'
import ItemRenderComponent from '../itemRenderComponent/ItemRenderComponent'
import './ArbitraryList.css'

function ArrayListSection({ data, recursiveKey }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <details
            className="list-item arbitrary-list"
            onToggle={(event) => setIsOpen(event.currentTarget.open)}
        >
            <summary>{isOpen ? 'Collapse' : 'Expand'}</summary>
            {data.map((item, index) => (
                <ArbitraryList
                    key={`${recursiveKey}-${index}`}
                    data={item}
                    recursiveKey={`${recursiveKey}-${index}`}
                />
            ))}
        </details>
    )
}

function ObjectListSection({ data, recursiveKey }) {
    const [isOpen, setIsOpen] = useState(false)
    const itemKeys = Reflect.ownKeys(data)

    return (
        <details
            className="list-item arbitrary-list"
            onToggle={(event) => setIsOpen(event.currentTarget.open)}
        >
            <summary>{isOpen ? 'Collapse' : 'Expand'}</summary>
            {itemKeys.map((key) => {
                const keyStr = String(key)
                const childKey = `${recursiveKey}-${keyStr}`

                if (typeof data[key] === 'object' && data[key] !== null) {
                    return (
                        <div className="list-item arbitrary-list-entry" key={childKey}>
                            {keyStr}:
                            <ArbitraryList data={data[key]} recursiveKey={childKey} />
                        </div>
                    )
                }

                return (
                    <ItemRenderComponent className="list-item" key={childKey}>
                        {`${keyStr}: ${data[key]}`}
                    </ItemRenderComponent>
                )
            })}
        </details>
    )
}

export default function ArbitraryList({ data, recursiveKey = "Begin" }) {
    if (data === null) {
        return <ItemRenderComponent
            className="list-item primitive-item">
            null
        </ItemRenderComponent>
    }
    if (typeof data !== 'object') {
        return <ItemRenderComponent
            className="list-item primitive-item">
            {
                data
            }
        </ItemRenderComponent>
    }

    if (Array.isArray(data)) {
        return <ArrayListSection data={data} recursiveKey={recursiveKey} />
    }

    return <ObjectListSection data={data} recursiveKey={recursiveKey} />
}
