import React from 'react';
import { css } from '@emotion/css';
import { EmptyState, LinkButton } from '@grafana/ui';
import { Page } from 'app/core/components/Page/Page';

interface SingleDashboardViewProps {
  title: string;
}

export const SingleDashboardView = ({ title }: SingleDashboardViewProps) => {
  return (
    <Page navId={getNavIdFromTitle(title)}>
      <Page.Contents>
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          `}
        >
          <EmptyState
            variant="call-to-action"
            button={
              <LinkButton href="dashboard/new" icon="plus" size="lg">
                Create dashboard
              </LinkButton>
            }
            message="You haven't created any dashboards yet"
          />
        </div>
      </Page.Contents>
    </Page>
  );
};

function getNavIdFromTitle(title: string): string {
    // These IDs must match what is defined in pkg/services/navtree/navtreeimpl/navtree.go
    switch (title) {
        case 'CMDB Inventory':
            return 'cmdb-inventory';
        case 'Automation Hub':
            return 'automation-hub';
        case 'Capacity Planning':
            return 'capacity-planning';
        case 'Compliance':
            return 'compliance';
        case 'Reports & Insights':
            return 'reports-insights';
        default:
            return '';
    }
}
