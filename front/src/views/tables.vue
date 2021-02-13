<template>
  <div style="display:flex">
<!--
    <h2 class="content-block">Таблицы</h2>
-->
    <dx-data-grid
      class="dx-card wide-card"
      :allow-column-resizing="true"
      :data-source="dataSourceConfig"
      :focused-row-index="0"
      :show-borders="false"
      :show-column-lines="true"
      :show-row-lines="false"
      :row-alternation-enabled="true"
      :focused-row-enabled="true"
      :column-auto-width="true"
      :column-hiding-enabled="false"
      :width="'100%'"
      :height="'100%'"
    >

      <dx-pager :visible="'true'" :show-info="true" :show-navigation-buttons="0" />
      <dx-paging :page-size="100" />
      <dx-scrolling mode="virtual" row-rendering-mode="virtual" />

      <dx-filter-row :visible="true" />

		<dx-column data-field="id"    caption="Имя" />
		<dx-column data-field="note"  caption="Комментарий" />
		<dx-column data-field="pk"    caption="ПК" />
		<dx-column data-field="cnt"   caption="~К-во строк" />

    </dx-data-grid>

  </div>
</template>

<script>
import "devextreme/data/odata/store";
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging,
  DxScrolling
} from "devextreme-vue/data-grid";

export default {
  setup() {
    const dataSourceConfig = {
      store: {
        type: "odata",
        key: "id",
        url: "/_back/tables"
      },
    };
    return {
      dataSourceConfig,      
    };
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
};
</script>
