import './ClassComponent.css'
import ArbitraryList from '../arbitraryList/ArbitraryList'

export default function ClassComponent({ listToRender }) {
    return (
        <div className="classComponent">
            <ArbitraryList data={listToRender} />
        </div>
    )
}