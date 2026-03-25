import { Component } from 'react'

import './ItemRenderComponent.css'
export default class ItemRenderComponent extends Component {
    render() {
        const { children, className = '' } = this.props

        return (
            <div className={`item-render-component ${className}`.trim()}>
                {children}
            </div>
        )
    }
}