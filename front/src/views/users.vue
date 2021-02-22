<template>

<!--
	<Promised :promise="data">
<template v-slot="data">
-->

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

		  <dx-export :enabled="true" />

		  <dx-pager :visible="true" :show-info="true" :show-navigation-buttons="false" />
		  <dx-paging :page-size="100" />
		  <dx-scrolling mode="virtual" row-rendering-mode="virtual" />

		  <dx-filter-row :visible="true" />

			<dx-column data-field="label" caption="Имя" />

		</dx-data-grid>

<!--
</template>
	</Promised>
-->
</template>

<script>

import "devextreme/data/odata/store"

import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging,
  DxScrolling,
  DxExport
} from "devextreme-vue/data-grid"

import {ref} from "vue";

//import {usePromise} from 'vue-promised'

export default {

  data () {
	return {
		src: {store: {url: "/_back/users", type: "odata", key: "uuid", version: 4}},
    }    
  },

  created () {  
  },

  components: {
    DxDataGrid,
    DxExport,
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
    DxScrolling
  }
  
}

</script>
