<template>
  <div class="side-nav-outer-toolbar">
    <header-toolbar
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    <dx-drawer
      class="layout-body"
      position="before"
      template="menuTemplate"
      v-model:opened="menuOpened"
      :opened-state-mode="drawerOptions.menuMode"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      :max-size="drawerOptions.maxMenuSize"
      :shading="drawerOptions.shaderEnabled"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
    >
    
    <div class="layout-main">
	    <h2>{{header}}</h2>
		<slot />
        <slot name="footer" />
    </div>

      <template #menuTemplate>
        <side-nav-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />
      </template>
    </dx-drawer>
  </div>
</template>

<script>
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";

import menuItems from "../app-navigation";
import HeaderToolbar from "../components/header-toolbar";
import SideNavMenu from "../components/side-nav-menu";
import { computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  setup(props) {
    const route = useRoute();

//    const scrollViewRef = ref(null);
    const menuOpened = ref(props.isLarge);
    const menuTemporaryOpened = ref(false);

    function toggleMenu(e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (menuOpened.value) {
        menuTemporaryOpened.value = false;
      }
      menuOpened.value = !menuOpened.value;
    }

    function handleSideBarClick() {
      if (menuOpened.value === false) {
        menuTemporaryOpened.value = true;
      }
      menuOpened.value = true;
    }

    const drawerOptions = computed(() => {
      const shaderEnabled = !props.isLarge;

      return {
        menuMode: props.isLarge ? "shrink" : "overlap",
        menuRevealMode: props.isXSmall ? "slide" : "expand",
        minMenuSize: props.isXSmall ? 0 : 60,
        maxMenuSize: props.isXSmall ? 250 : undefined,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    });

    watch(
      () => props.isLarge,
      () => {
        if (!menuTemporaryOpened.value) {
          menuOpened.value = props.isLarge;
        }
    });

    watch(
      () => route.path,
      () => {
        if (menuTemporaryOpened.value || !props.isLarge) {
          menuOpened.value = false;
          menuTemporaryOpened.value = false;
        }
//      scrollViewRef.value.instance.scrollTo(0);
      }
    );

    return {
      header: route.meta.header,
      menuOpened,
      menuItems,
      toggleMenu,
      handleSideBarClick,
      drawerOptions,
//      scrollViewRef
    };
  },
  components: {
    DxDrawer,
    DxScrollView,
    HeaderToolbar,
    SideNavMenu
  }
};
</script>

<style lang="scss">
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.layout-main {
	height:100%;
	display:flex;
	flex-direction: column;
	&>h2 {
		margin: 0;
		padding: 5px 0 5px 20px;
		font-size: 16pt;
	}
}

.content {
  flex-grow: 1;
  display: flex;
}
</style>
