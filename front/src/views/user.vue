<template>

  <Promised :promise="data">

    <template v-slot:pending>...</template>
    
    <template v-slot="data">

		<div>
		
			<h2 class="content-block">{{data ['role.label']}} {{data.label}}</h2>
			
			<div class="content-block dx-card responsive-paddings">
			  <dx-form
				id="form"
				label-location="top"
				:form-data="data"
				:activeStateEnabled="true"
				:hoverStateEnabled="true"
				:colCountByScreen="colCountByScreen"
				:disabled="disabled"
				@fieldDataChanged="update"
			  >

				<dx-item data-field="label" />
				<dx-item data-field="login" />
				<dx-item data-field="mail" />

			  </dx-form>
			</div>

		</div>

    </template>
    
  </Promised>
  
</template>

<script>

import {DxForm, DxItem} from "devextreme-vue/form";
import {useRoute} from 'vue-router'

export default {
    
  data () {
    
    const colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    }

    return {
      data: {},
      disabled: false,
      route: useRoute (),
      colCountByScreen
    };
    
  },
  
  created () {
  	let {id} = this.route.params
    this.data = response ({type: 'users', id})   
  },
  
  components: {
    DxForm,
    DxItem,
  },
  
  methods: {
  
  	update: async function (e) {
  	
	  	let {id} = this.route.params
  		let {dataField, value} = e
  		this.disabled = true
  		await response ({type: 'users', id, action: 'update'}, {data: {[dataField]: value}})
  		this.disabled = false
  	
  	}
  
  }
  
};
</script>
