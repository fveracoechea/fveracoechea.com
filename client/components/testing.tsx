const text = "Button text";

const buttonProps = {
  title: "title",
  class: "color-red",
  id: "btn-id",
};

function MyComponent() {
  return (
    <div id="component" class="p-12">
      <nav>TESTING</nav>
      <div>
        <button {...buttonProps}>{text}</button>
      </div>
      <section class="section">SECTION</section>
      <section class="section">2</section>
      <section class="number">{4}</section>
      <section class="func">{() => {}}</section>
      <section class="array text-xl">{[1, 2, 3, 4]}</section>
      <div class="childless" />
    </div>
  );
}

console.log(<MyComponent />);
document.body.appendChild(MyComponent());
