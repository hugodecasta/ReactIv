export default function init(element_id, component) {
    const root = document.getElementById(element_id)
    component.render()
    root.append(component.get_element())
}