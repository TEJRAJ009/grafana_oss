import { SingleDashboardView } from './SingleDashboardView';

const CompliancePage = () => {
    return (
        <SingleDashboardView
            title="You haven't created any Compliance dashboards yet"
            subtitle="Create dashboards to monitor and manage compliance requirements."
            navId="compliance"
            folderTitle="Compliance"
            createButtonText="Create dashboard"
        />
    );
};

export default CompliancePage;
