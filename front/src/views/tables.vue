<template>

	<Promised :promise="data">

<template v-slot="data">

		<dx-data-grid

		  :data-source="src"

		  :row-alternation-enabled="true"
		  :focused-row-enabled="true"

		  :column-auto-width="true"
		  :allow-column-resizing="true"

		  :show-borders="false"
		  :show-column-lines="true"
		  :show-row-lines="false"

		  @toolbar-preparing="onToolbarPreparing"

		>

		  <dx-export :enabled="true" />

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

	</Promised>

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

import {usePromise} from 'vue-promised'

export default {

  data () {
	return {
		selected_databases: {},
		src: {store: {url: "/_back/tables", type: "odata", key: "id",		
			beforeSend: e => e.params.pre = Object.keys (this.selected_databases).join ('|')
		}},
    }    
  },

  created () {

	this.data = (async () => {
			
		let {src} = await response ({type: 'tables', part: 'vocs'})
			
		this.onToolbarPreparing = e => {
		
			this.selected_databases [src [0].id] = true
			
			for (let {id, label, value} of src) e.toolbarOptions.items.push ({
                widget: 'dxCheckBox',
                options: {
                	value: !!this.selected_databases [id],
                	text: label,
                    onValueChanged: ({value}) => {
                    
                    	if (value) this.selected_databases [id] = true; else delete this.selected_databases [id]
                        e.component.refresh ()
                    
                    }
                    
                },
                location: 'before'
            })

		}

		return 1
				
	})()
			
  
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
