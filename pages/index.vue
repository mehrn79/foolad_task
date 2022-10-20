<template>
  <div class="option-container">
    <v-row class="option-container">
      <v-btn color="#009459" style="color:#fff" @click="saveChanges">reset</v-btn>
    </v-row>
    <DxLoadPanel
      :position="loadPanelPosition"
      :visible="isLoading"
    />
    <DxDataGrid
      ref="dataGrid"
      :allow-column-reordering="true"
      :data-source="orders"
      key-expr="id"
      :show-borders="true"
      :allow-column-resizing="true"
      :repaint-changes-only="true"
      @saving="onSaving"
    >
    <DxEditing
        v-model="changes"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          title="product info"
        />
        <DxForm>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
          >
            <DxItem data-field="category"/>
            <DxItem data-field="title"/>
            <DxItem data-field="brand"/>
            <DxItem data-field="description"/>
            <DxItem data-field="price"/>
            <DxItem data-field="discountPercentage"/>
            <DxItem data-field="rating"/>
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxFilterRow
        :visible="true"
      />
      <DxHeaderFilter
        :visible="true"
      />
      <DxSearchPanel
        :visible="true"
        :width="240"
        placeholder="Search..."
      />
      <DxRowDragging
        :allow-reordering="true"
        :on-reorder="onReorder"
        :show-drag-icons="false"
      />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="storage"
      />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[5, 10, 20]"
      />
      <DxColumnChooser :enabled="true"/>
      <DxColumn data-field="title"/>
      <DxColumn data-field="brand"/>
      <DxColumn data-field="description"/>
      <DxColumn data-field="price"/>
      <DxColumn data-field="discountPercentage"/>
      <DxColumn data-field="rating"/>
      <DxColumn
       data-field="stock"
       :visible="false"
       />
      <DxColumn
        :group-index="0"
        data-field="category"
      />

      <DxGroupPanel :visible="true"/>
      <DxGrouping :auto-expand-all="autoExpandAll"/>
      <DxPaging :page-size="10"/> 
    </DxDataGrid>
  </div>
</template>

<script>

import 'devextreme/dist/css/dx.light.css';
import { DxItem } from 'devextreme-vue/form';
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxPaging,
  DxHeaderFilter,
  DxFilterRow,
  DxRowDragging,
  DxStateStoring,
  DxEditing,
  DxPopup,
  DxForm,
  DxLoadPanel,
  DxColumnChooser,
  DxPager
} from 'devextreme-vue/data-grid';
import { mapGetters, mapActions } from 'vuex';


export default {
  components: {
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid,
    DxHeaderFilter,
    DxFilterRow,
    DxRowDragging,
    DxStateStoring,
    DxEditing,
    DxPopup,
    DxForm,
    DxItem,
    DxLoadPanel,
    DxColumnChooser,
    DxPager
  },
  data() {
    return {
      loadPanelPosition: { of: '#gridContainer' },
      autoExpandAll: false,
    };
  },
  created () {
    this.$store.dispatch('getOrders')
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['orders', 'isLoading']),
    editRowKey: {
      get() {
        return this.$store.state.editRowKey;
      },
      set(value) {
        this.setEditRowKey(value);
      },
    },
    changes: {
      get() {
        return this.$store.state.changes;
      },
      set(value) {
        this.setChanges(value);
      },
    },
  },
  methods: {
    onReorder(e) {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = this.data.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
      const fromIndex = this.data.findIndex((item) => item.id === e.itemData.id);
      const newTasks = [...this.data];

      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);

      this.data = newTasks;
    },
    saveChanges() {
      this.$refs.dataGrid.instance.state(null);
    },
    ...mapActions(['insert', 'update', 'remove','saveChange']),
    onSaving(e) {
      e.cancel = true;
      e.promise = this.saveChange(e.changes[0]);
    },
  }
}
</script>


<style lang="scss" scoped>

#gridContainer {
  height: auto;
}
  .option-container{
    margin: 20px;
    direction: rtl;
  }
</style>