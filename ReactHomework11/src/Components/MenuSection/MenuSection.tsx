import { useEffect, useState } from 'react'
import styles from './MenuSection.module.css'
import { fetchMenuItems, type MenuItem } from '../../config/cdn'

const CATEGORY_TABS = ['Dessert', 'Dinner', 'Breakfast']

type MenuSectionProps = {
  onAddToCart?: (item: MenuItem) => void
}

const MenuSection = ({ onAddToCart }: MenuSectionProps) => {
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({})
  const [activeTab, setActiveTab] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [itemsVisible, setItemsVisible] = useState(6)

  useEffect(() => {
    const controller = new AbortController()

    const loadMenu = async () => {
      setIsLoading(true)
      setError('')

      try {
        const groupedMeals = await fetchMenuItems(controller.signal)
        const nextTabs = CATEGORY_TABS.filter((tab) => groupedMeals[tab]?.length)

        setMenuItems(groupedMeals)
        setActiveTab((currentTab) =>
          currentTab && groupedMeals[currentTab] ? currentTab : nextTabs[0] || ''
        )
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setError('Unable to load the menu right now.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadMenu()

    return () => controller.abort()
  }, [])

  const onSetActiveTab = (tab: string) => {
    setActiveTab(tab)
    setItemsVisible(6)
  }

  const tabs = CATEGORY_TABS.filter((tab) => menuItems[tab]?.length)
  const items = menuItems[activeTab] || []

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Browse our menu</h2>
          <p className={styles.subtitle}>
            Use our menu to place an order online, or{' '}
            <a href="#" className={styles.phoneLink}>
              phone
            </a>{' '}
            our store to
            <br />
            place a pickup order. Fast and fresh food.
          </p>
        </div>

        <div className={styles.tabs}>
          <div className={styles.tabMenu}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tabLink} ${activeTab === tab ? styles.tabLinkActive : ''}`}
                onClick={() => onSetActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {isLoading ? (
              <p className={styles.subtitle}>Loading menu...</p>
            ) : error ? (
              <p className={styles.subtitle}>{error}</p>
            ) : (
              <div className={styles.orderGrid}>
                {items.slice(0, itemsVisible).map((item) => (
                  <div key={item.id} className={styles.menuItem}>
                    <div className={styles.foodCard}>
                      <div className={styles.foodImageSquare}>
                        <img src={item.image} alt={item.name} className={styles.foodImage} />
                      </div>
                      <div className={styles.foodCardContent}>
                        <div className={styles.foodTitleWrap}>
                          <h6 className={styles.foodTitle}>{item.name}</h6>
                          <div className={styles.price}>$ {item.price.toFixed(2)} USD</div>
                        </div>
                        <p className={styles.paragraph}>{item.description}</p>
                        <button className={styles.orderButton} onClick={() => onAddToCart?.(item)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => setItemsVisible((prev) => prev + 6)}
            disabled={itemsVisible >= items.length}
          >
            See more
          </button>
        </div>
      </div>
    </section>
  )
}

export default MenuSection
