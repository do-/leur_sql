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
		
		  <dx-filter-panel :visible="true" />

		  <dx-pager :visible="true" :show-info="true" :show-navigation-buttons="false" />
		  <dx-paging :page-size="100" />
		  <dx-scrolling mode="virtual" row-rendering-mode="virtual" />

		  <dx-filter-row :visible="true" />

			<dx-column data-field="label" caption="ФИО" />
			<dx-column data-field="login" caption="Login" />
			<dx-column data-field="id_role" caption="Роль">
				<dx-lookup :data-source="roles.data" value-expr="id" display-expr="label" />				
			</dx-column>
			<dx-column data-field="mail" caption="E-mail" />
			<dx-column type="buttons">
				<dx-button name="open" text="..." @click="go" />				
			</dx-column>

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
  DxScrolling,
  DxButton,
  DxFilterPanel
} from "devextreme-vue/data-grid"

import {ref} from "vue"
import {useRouter} from 'vue-router'
import roles from '../../../back/lib/Model/roles.js';

export default {


  data () {
	return {
		router: useRouter (),
		src: {store: {url: "/_back/users", type: "odata", key: "uuid", version: 4}},
		roles,
    }    
  },
  
  methods: {
	  go: function (e) {this.router.push ('/user/' + e.row.data.uuid)},
  },

  components: {
    DxDataGrid,
    DxButton,
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
