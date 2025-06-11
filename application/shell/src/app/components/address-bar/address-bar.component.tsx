import './address-bar.component.scss';

export function AddressBar() {
  return <div class="address-bar d-flex flex">
    <input type="text" value="blub" class="pv-12 address-bar__url flex" />
  </div>;
}