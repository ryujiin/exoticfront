<template lang="pug">
  aside.menu
    p.menu-label
      | General
    ul.menu-list
      li
        a.is-active Dashboard
      li
        a Clientes
    p.menu-label
      | Administracion
    ul.menu-list
      li
        a Productos
      li
        a Categorias
    p.menu-label
      | Transaciones
    ul.menu-list
      li
        a Pagos
      li
        a Pedidos
      li
        a Ingresos
</template>

<style scoped>
.menu-label {
  color: #8F99A3;
  letter-spacing: 1.3;
  font-weight: 700;
}
.menu-list a {
  color: #0F1D38;
  font-size: 14px;
  font-weight: 700;
}
.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}
.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}

nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item, .navbar-link {
  font-size: 14px;
  font-weight: 700;
}
</style>