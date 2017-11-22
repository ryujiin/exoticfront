<template lang="pug">
.adminPage
  .container
    .columns
      .column.is-3
        lv-admin-menu
      .column.is-9
        nav.breadcrumb(aria-label='breadcrumbs')
          ul
            li
              a(href='../') Bulma
            li
              a(href='../') Templates
            li
              a(href='../') Examples
            li.is-active
              a(href='#', aria-current='page') Admin
        section.hero.is-info.welcome.is-small
          .hero-body
            .container
              h1.title
                | Hello, Admin.
              h2.subtitle
                | I hope you are having a great day!
        section.info-tiles
          .tile.is-ancestor.has-text-centered
            .tile.is-parent
              article.tile.is-child.box
                p.title 439k
                p.subtitle Users
            .tile.is-parent
              article.tile.is-child.box
                p.title 59k
                p.subtitle Products
            .tile.is-parent
              article.tile.is-child.box
                p.title 3.4k
                p.subtitle Open Orders
            .tile.is-parent
              article.tile.is-child.box
                p.title 19
                p.subtitle Exceptions
        .columns
          .column.is-6
            .card.events-card
              header.card-header
                p.card-header-title
                  | Events
                a.card-header-icon(href='#', aria-label='more options')
                  span.icon
                    i.fa.fa-angle-down(aria-hidden='true')
              .card-table
                .content
                  table.table.is-fullwidth.is-striped
                    tbody
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
                      tr
                        td(width='5%')
                          i.fa.fa-bell-o
                        td Lorum ipsum dolem aire
                        td
                          a.button.is-small.is-primary(href='#') Action
              footer.card-footer
                a.card-footer-item(href='#') View All
          .column.is-6
            .card
              header.card-header
                p.card-header-title
                  | Inventory Search
                a.card-header-icon(href='#', aria-label='more options')
                  span.icon
                    i.fa.fa-angle-down(aria-hidden='true')
              .card-content
                .content
                  .control.has-icons-left.has-icons-right
                    input.input.is-large(type='text', placeholder='')
                    span.icon.is-medium.is-left
                      i.fa.fa-search
                    span.icon.is-medium.is-right
                      i.fa.fa-check
            .card
              header.card-header
                p.card-header-title
                  | User Search
                a.card-header-icon(href='#', aria-label='more options')
                  span.icon
                    i.fa.fa-angle-down(aria-hidden='true')
              .card-content
                .content
                  .control.has-icons-left.has-icons-right
                    input.input.is-large(type='text', placeholder='')
                    span.icon.is-medium.is-left
                      i.fa.fa-search
                    span.icon.is-medium.is-right
                      i.fa.fa-check
</template>

<script>
import lvAdminMenu from '@/components/admin/menu/Menu'

export default {
  components: {
    lvAdminMenu
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
html, body {
  font-family: 'Open Sans', serif;
  font-size: 16px;
  line-height: 1.5;
  height: 100%;
  background: #ECF0F3;
}
.columns {
  width: 100%;
  height: 100%;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8F99A3;
  font-weight: 400;
}
.info-tiles {
  margin: 1rem 0;
}
.info-tiles .subtitle {
  font-weight: 300;
  color: #8F99A3;
}
.hero.welcome.is-info {
  background: #36D1DC;
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
  background: linear-gradient(to right, #5B86E5, #36D1DC);
}
.hero.welcome .title, .hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.card .content {
  font-size: 14px;
}
.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8F99A3;
}
.card-footer-item:hover {
}
.card-table .table {
  margin-bottom: 0;
}
.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}

</style>
