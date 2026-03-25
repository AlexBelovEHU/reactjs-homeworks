import { Component } from 'react'
import ItemRenderComponent from '../itemRenderComponent/ItemRenderComponent'
import './ArbitraryList.css'

export default class ArbitraryList extends Component {
    render() {
        const { data, recursiveKey = "Begin" } = this.props

        const itemKeys = Reflect.ownKeys(data)
        const isArray = Array.isArray(data)

        return (
            <details className="list-item arbitrary-list">
                <summary>{isArray ? 'Array' : 'Object'}</summary>

                {itemKeys.map((key) => {
                    const item = data[key]
                    const currentKey = !isArray ? String(key) : null
                    const childKey = `${recursiveKey}-${currentKey}`

                    if (typeof item !== 'object' || item === null) {
                        return (
                            <ItemRenderComponent key={childKey} className="list-item primitive-item">
                                {(currentKey ? currentKey + ': ' : '') + String(item)}
                            </ItemRenderComponent>
                        )
                    }
                    return (
                        <>
                        {(currentKey ? currentKey + ': ' : '')}
                        <ArbitraryList key={childKey} data={item} recursiveKey={childKey} />
                        </>
                    )

                })}
            </details>
        )
    }
}
