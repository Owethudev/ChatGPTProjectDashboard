import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Project } from '../../types';
import { ProjectStatusChart } from './ProjectStatusChart';

const createProject = (overrides: Partial<Project> = {}): Project => ({
  id: 'project-id',
  name: 'Sample Project',
  description: 'Sample description',
  status: 'Active',
  priority: 'High',
  progress: 50,
  deadline: '2026-08-20',
  startDate: '2026-02-01',
  teamMemberIds: [],
  createdAt: '2026-01-15',
  updatedAt: '2026-01-15',
  ...overrides,
});

const renderChart = (projects: Project[]) =>
  render(<ProjectStatusChart projects={projects} />);

const getLegendRow = (status: string) => {
  const statusNode = screen.getByText(status);
  return statusNode.closest('div')?.parentElement as HTMLDivElement;
};

const getSwatch = (status: string) => {
  const row = getLegendRow(status);
  return row?.querySelector('span[style]') as HTMLSpanElement | null;
};

describe('ProjectStatusChart', () => {
  it('renders the empty state when the projects array is empty', () => {
    const projects: Project[] = [];

    renderChart(projects);

    expect(
      screen.getByText('No project data available.'),
    ).toBeInTheDocument();
  });

  it('renders the chart when projects exist', () => {
    const projects = [createProject({ id: 'p1', status: 'Active' })];

    const { container } = renderChart(projects);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows every supported status in the legend', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Active' }),
      createProject({ id: 'p2', status: 'On Track' }),
      createProject({ id: 'p3', status: 'Planning' }),
      createProject({ id: 'p4', status: 'At Risk' }),
      createProject({ id: 'p5', status: 'Completed' }),
      createProject({ id: 'p6', status: 'Archived' }),
    ];

    renderChart(projects);

    for (const status of [
      'Active',
      'On Track',
      'Planning',
      'At Risk',
      'Completed',
      'Archived',
    ]) {
      expect(screen.getByText(status)).toBeInTheDocument();
    }
  });

  it('aggregates duplicate statuses and displays the correct counts and percentages', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Active' }),
      createProject({ id: 'p2', status: 'Active' }),
      createProject({ id: 'p3', status: 'On Track' }),
      createProject({ id: 'p4', status: 'Archived' }),
    ];

    renderChart(projects);

    expect(getLegendRow('Active').textContent).toContain('2 (50%)');
    expect(getLegendRow('On Track').textContent).toContain('1 (25%)');
    expect(getLegendRow('Archived').textContent).toContain('1 (25%)');
  });

  it('renders a single project dataset with a 100% share', () => {
    const projects = [createProject({ id: 'p1', status: 'Completed' })];

    renderChart(projects);

    expect(getLegendRow('Completed').textContent).toContain('1 (100%)');
  });

  it('handles mixed status datasets without losing any visible status summary', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Planning' }),
      createProject({ id: 'p2', status: 'Active' }),
      createProject({ id: 'p3', status: 'Completed' }),
    ];

    renderChart(projects);

    expect(getLegendRow('Planning').textContent).toContain('1 (33%)');
    expect(getLegendRow('Active').textContent).toContain('1 (33%)');
    expect(getLegendRow('Completed').textContent).toContain('1 (33%)');
  });

  it('renders archived project rows as a supported status and keeps the visible fraction accurate', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Archived' }),
      createProject({ id: 'p2', status: 'Archived' }),
      createProject({ id: 'p3', status: 'Active' }),
    ];

    renderChart(projects);

    expect(getLegendRow('Archived').textContent).toContain('2 (67%)');
    expect(getLegendRow('Active').textContent).toContain('1 (33%)');
  });

  it('renders completed project rows as a supported status and keeps the visible fraction accurate', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Completed' }),
      createProject({ id: 'p2', status: 'Completed' }),
      createProject({ id: 'p3', status: 'On Track' }),
    ];

    renderChart(projects);

    expect(getLegendRow('Completed').textContent).toContain('2 (67%)');
    expect(getLegendRow('On Track').textContent).toContain('1 (33%)');
  });

  it('uses the fallback color for unknown status values instead of crashing', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Unknown Status' as Project['status'] }),
    ];

    renderChart(projects);

    expect(screen.getByText('Unknown Status')).toBeInTheDocument();
    expect(getSwatch('Unknown Status')).toHaveStyle({
      backgroundColor: '#94a3b8',
    });
  });

  it('does not throw when the chart and tooltip render path are exercised', () => {
    const projects = [
      createProject({ id: 'p1', status: 'Active' }),
      createProject({ id: 'p2', status: 'Completed' }),
    ];

    expect(() => renderChart(projects)).not.toThrow();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
