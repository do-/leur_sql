<template>

    <dx-data-grid

      :data-source="src"

      :row-alternation-enabled="true"
      :focused-row-enabled="true"

      :column-auto-width="true"
      :allow-column-resizing="true"

      :show-borders="false"
      :show-column-lines="true"
      :show-row-lines="false"

    >

      <dx-pager :visible="true" :show-info="true" :show-navigation-buttons="false" />
      <dx-paging :page-size="100" />
      <dx-scrolling mode="virtual" row-rendering-mode="virtual" />

      <dx-filter-row :visible="true" />

		<dx-column data-field="id"    caption="Имя" />
		<dx-column data-field="note"  caption="Комментарий" />
		<dx-column data-field="pk"    caption="ПК" />
		<dx-column data-field="cnt"   caption="~К-во строк" />

    </dx-data-grid>

</template>

<script>

import "devextreme/data/odata/store"

import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging,
  DxScrolling
} from "devextreme-vue/data-grid"

export default {

  setup () {
    return {
		src: {store: {url: "/_back/tables", type: "odata", key: "id"}}
    }
  },
  
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
    DxScrolling
  }
  
}

</script>
