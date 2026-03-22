import './ItemRenderComponent.css'
export default function ItemRenderComponent({ itemToRender, children, className = '' }) {
    const htmlContent = itemToRender ?? children ?? ''

    return (
        <div
            className={`item-render-component ${className}`.trim()}
            dangerouslySetInnerHTML={{ __html: String(htmlContent) }}
        />
    )
}