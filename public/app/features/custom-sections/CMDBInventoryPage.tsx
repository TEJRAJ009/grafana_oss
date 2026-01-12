import { SingleDashboardView } from './SingleDashboardView';

const CMDBInventoryPage = () => {
    return (
        <SingleDashboardView
            title="You haven't created any CMDB Inventory dashboards yet"
            subtitle="Create dashboards to manage your configuration management database inventory."
            navId="cmdb-inventory"
            folderTitle="CMDB Inventory"
            createButtonText="Create dashboard"
        />
    );
};

export default CMDBInventoryPage;
