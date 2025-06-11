import './search-bar.component.scss';

export function SearchBar() {
  return <div class="search-bar d-flex">
    <input type="text" value="blub" class="pv-12 search-bar__term flex" />
  </div>;
}