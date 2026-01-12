import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Button, useStyles2, Text, Box, Stack, Spinner, Card, LinkButton } from '@grafana/ui';
import { Page } from 'app/core/components/Page/Page';

export interface SingleDashboardViewProps {
  title: string;
  subtitle: string;
  navId: string;
  folderTitle: string;
  createButtonText?: string;
}

interface Dashboard {
  uid: string;
  title: string;
  url: string;
  type: string;
}

interface FolderInfo {
  uid: string;
  title: string;
}

export const SingleDashboardView = ({
  title,
  subtitle,
  navId,
  folderTitle,
  createButtonText = 'Create dashboard',
}: SingleDashboardViewProps) => {
  const styles = useStyles2(getStyles);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [folder, setFolder] = useState<FolderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First, try to find or create the folder for this section
        const foldersResponse = await getBackendSrv().get('/api/folders');
        let sectionFolder = foldersResponse.find((f: FolderInfo) => f.title === folderTitle);

        if (!sectionFolder) {
          // Create the folder if it doesn't exist
          try {
            sectionFolder = await getBackendSrv().post('/api/folders', {
              title: folderTitle,
            });
          } catch (createError: any) {
            // Folder might already exist (race condition) or permission denied
            if (createError.status !== 409) {
              console.error('Could not create folder:', createError);
            }
            // Try to find it again
            const refetchFolders = await getBackendSrv().get('/api/folders');
            sectionFolder = refetchFolders.find((f: FolderInfo) => f.title === folderTitle);
          }
        }

        setFolder(sectionFolder || null);

        if (sectionFolder) {
          // Fetch dashboards in this folder
          const searchResponse = await getBackendSrv().get('/api/search', {
            folderUIDs: sectionFolder.uid,
            type: 'dash-db',
          });
          setDashboards(searchResponse || []);
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching dashboards:', err);
        setError(err.message || 'Failed to load dashboards');
        setLoading(false);
      }
    };

    fetchData();
  }, [folderTitle]);

  const handleCreateDashboard = () => {
    // Navigate to dashboard creation with folder pre-selected
    if (folder) {
      window.location.href = `/dashboard/new?folderUid=${folder.uid}`;
    } else {
      window.location.href = '/dashboard/new';
    }
  };

  if (loading) {
    return (
      <Page navId={navId}>
        <Page.Contents>
          <Stack alignItems="center" justifyContent="center" direction="column">
            <Spinner size="xl" />
            <Text>Loading dashboards...</Text>
          </Stack>
        </Page.Contents>
      </Page>
    );
  }

  if (error) {
    return (
      <Page navId={navId}>
        <Page.Contents>
          <Stack alignItems="center" justifyContent="center" direction="column">
            <Text color="error">{error}</Text>
          </Stack>
        </Page.Contents>
      </Page>
    );
  }

  // If there are dashboards, show them
  if (dashboards.length > 0) {
    return (
      <Page navId={navId}>
        <Page.Contents>
          <Stack direction="column" gap={3}>
            <Stack justifyContent="space-between" alignItems="center">
              <Text element="h2">{folderTitle} Dashboards</Text>
              <Button icon="plus" onClick={handleCreateDashboard}>
                {createButtonText}
              </Button>
            </Stack>

            <div className={styles.dashboardGrid}>
              {dashboards.map((dashboard) => (
                <Card key={dashboard.uid} href={dashboard.url}>
                  <Card.Heading>{dashboard.title}</Card.Heading>
                  <Card.Meta>Dashboard</Card.Meta>
                </Card>
              ))}
            </div>
          </Stack>
        </Page.Contents>
      </Page>
    );
  }

  // Empty state - no dashboards yet
  return (
    <Page navId={navId}>
      <Page.Contents>
        <Stack alignItems="center" justifyContent="center" direction="column">
          <div className={styles.wrapper}>
            <Stack alignItems="stretch" justifyContent="center" gap={4} direction="column">
              <Box borderRadius="lg" borderColor="strong" borderStyle="dashed" padding={4}>
                <Stack direction="column" alignItems="center" gap={2}>
                  <Text element="h1" textAlignment="center" weight="medium">
                    {title}
                  </Text>
                  <Box marginBottom={2} paddingX={4}>
                    <Text element="p" textAlignment="center" color="secondary">
                      {subtitle}
                    </Text>
                  </Box>
                  <Button
                    size="lg"
                    icon="plus"
                    onClick={handleCreateDashboard}
                  >
                    {createButtonText}
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </div>
        </Stack>
      </Page.Contents>
    </Page>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    wrapper: css({
      label: 'single-dashboard-view-wrapper',
      flexDirection: 'column',
      gap: theme.spacing.gridSize * 4,
      paddingTop: theme.spacing(2),
      maxWidth: '890px',

      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(12),
      },
    }),
    dashboardGrid: css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: theme.spacing(2),
    }),
  };
}

export default SingleDashboardView;
