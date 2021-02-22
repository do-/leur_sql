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
		
		  <dx-filter-panel :visible="true" />

		  <dx-export :enabled="true" />

		  <dx-pager :visible="true" :show-info="true" :show-navigation-buttons="false" />
		  <dx-paging :page-size="100" />
		  <dx-scrolling mode="virtual" row-rendering-mode="virtual" />

		  <dx-filter-row :visible="true" />

			<dx-column data-field="label" caption="ФИО" />
			<dx-column data-field="login" caption="Login" />
			<dx-column data-field="id_role" caption="Роль">
				<dx-lookup :data-source="roles" value-expr="id" display-expr="label" />				
			</dx-column>
			<dx-column data-field="mail" caption="E-mail" />

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
  DxExport,
  DxFilterPanel
} from "devextreme-vue/data-grid"

import {ref} from "vue";

//import {usePromise} from 'vue-promised'

export default {

  data () {
	return {
		src: {store: {url: "/_back/users", type: "odata", key: "uuid", version: 4}},
		roles: [
			{id: 1, label: 'Администратор'},
			{id: 2, label: 'Пользователь'},
		]
    }    
  },

  created () {  
  },

  components: {
    DxDataGrid,
    DxExport,
    DxFilterPanel,
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
    DxScrolling
  }
  
}

</script>
