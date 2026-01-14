import { SingleDashboardView } from './SingleDashboardView';

const CapacityPlanningPage = () => {
    return (
        <SingleDashboardView
            title="You haven't created any Capacity Planning dashboards yet"
            subtitle="Create dashboards to plan and forecast infrastructure capacity."
            navId="capacity-planning"
            folderTitle="Capacity Planning"
            createButtonText="Create dashboard"
        />
    );
};

export default CapacityPlanningPage;
