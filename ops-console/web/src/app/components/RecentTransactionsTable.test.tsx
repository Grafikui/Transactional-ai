import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RecentTransactionsTable from "./RecentTransactionsTable";

// Mock fetch for transactions

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: "t1", agent: "alice", state: "approved", started: "2026-01-08T12:00:00Z" },
        { id: "t2", agent: "bob", state: "pending", started: "2026-01-08T12:01:00Z" },
      ]),
    })
  ) as jest.Mock;
});

afterAll(() => {
  // @ts-ignore
  global.fetch.mockClear();
  delete global.fetch;
});

describe("RecentTransactionsTable", () => {
  it("renders transactions and filters by search", async () => {
    render(<RecentTransactionsTable />);
    await waitFor(() => {
      // Only check for table cell content, not select options
      const approvedCells = screen.getAllByText("approved");
      expect(approvedCells.some(cell => cell.tagName === "TD")).toBe(true);
      const pendingCells = screen.getAllByText("pending");
      expect(pendingCells.some(cell => cell.tagName === "TD")).toBe(true);
    });

    // Search filter
    const searchInput = screen.getByPlaceholderText("Search by ID or Agent");
    fireEvent.change(searchInput, { target: { value: "alice" } });
    await waitFor(() => {
      // Wait for only one row to be present
      const rows = screen.getAllByRole("row");
      // 1 header + 1 filtered row
      expect(rows.length).toBe(2);
      const approvedCells = screen.getAllByText("approved");
      expect(approvedCells.some(cell => cell.tagName === "TD")).toBe(true);
      const pendingCells = screen.queryAllByText("pending");
      expect(pendingCells.filter(cell => cell.tagName === "TD")).toHaveLength(0);
    });
  });

  it("shows error message on fetch failure", async () => {
    // @ts-ignore
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false, json: () => Promise.resolve([]) }));
    render(<RecentTransactionsTable />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading transactions/i)).toBeInTheDocument();
    });
  });
});
