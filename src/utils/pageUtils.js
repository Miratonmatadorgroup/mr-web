export const MoveToTop = () => {
    document.documentElement.scrollTo({
        top: 0,
        behavior:"smooth"
    })
}