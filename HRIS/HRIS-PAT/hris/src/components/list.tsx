import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { ListBaseProps, ListControllerResult, RaRecord } from "ra-core";
import {
  FilterContext,
  ListBase,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "ra-core";
import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { CreateButton } from "@/components/create-button";
import { ExportButton } from "@/components/export-button";
import { ListPagination } from "@/components/list-pagination";
import { FilterButton, FilterForm } from "@/components/filter-form";
import { ColumnsButton } from "@/components/columns-button";

/**
 * A complete list page with breadcrumb, title, filters, and pagination.
 *
 * It fetches a list of records from the data provider (via ra-core hooks),
 * puts them in a ListContext, renders a default layout (breadcrumb, title,
 * action buttons, inline filters, pagination), then renders its children
 * (usually a <DataTable>).
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/list/ List documentation}
 *
 * @example
 * import { DataTable, List } from "@/components/admin";
 *
 * export const UserList = () => (
 *   <List>
 *     <DataTable>
 *       <DataTable.Col source="id" />
 *       <DataTable.Col source="name" />
 *       <DataTable.Col source="username" />
 *       <DataTable.Col source="email" />
 *       <DataTable.Col source="address.street" />
 *       <DataTable.Col source="phone" />
 *       <DataTable.Col source="website" />
 *       <DataTable.Col source="company.name" />
 *     </DataTable>
 *   </List>
 * );
 */
export const List = <RecordType extends RaRecord = RaRecord>(
  props: ListProps<RecordType>,
) => {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter,
    filterDefaultValues,
    loading,
    perPage,
    queryOptions,
    resource,
    sort,
    storeKey,
    hasCreate: hasCreateProp,
    ...rest
  } = props;

  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      loading={loading}
      perPage={perPage}
      queryOptions={queryOptions}
      resource={resource}
      sort={sort}
      storeKey={storeKey}
    >
      <ListView<RecordType> hasCreate={hasCreateProp} exporter={exporter} {...rest} />
    </ListBase>
  );
};

export interface ListProps<RecordType extends RaRecord = RaRecord>
  extends ListBaseProps<RecordType>, ListViewProps<RecordType> { }

/**
 * The view component for List pages with layout and UI.
 *
 * @internal
 */
export const ListView = <RecordType extends RaRecord = RaRecord>(
  props: ListViewProps<RecordType>,
) => {
  const {
    disableBreadcrumb,
    filters,
    pagination = defaultPagination,
    title,
    children,
    actions,
    aside,
    className,
    hasCreate: hasCreateProp,
    exporter,
  } = props;
  const translate = useTranslate();
  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The ListView component must be used within a ResourceContextProvider",
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const resourceLabel = getResourceLabel(resource, 2);
  const finalTitle =
    title !== undefined
      ? title
      : translate("ra.page.list", {
        name: resourceLabel,
      });
  const { hasCreate: resourceHasCreate } = useResourceDefinition({ resource });
  const hasCreate = hasCreateProp !== undefined ? hasCreateProp : resourceHasCreate;
  const hasDashboard = useHasDashboard();

  return (
    <>
      {!disableBreadcrumb && (
        <Breadcrumb>
          {hasDashboard && (
            <BreadcrumbItem>
              <Link to="/">
                <Translate i18nKey="ra.page.dashboard">Home</Translate>
              </Link>
            </BreadcrumbItem>
          )}
          <BreadcrumbPage>{resourceLabel}</BreadcrumbPage>
        </Breadcrumb>
      )}

      <FilterContext.Provider value={filters}>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {finalTitle}
            </h2>
            <div className="flex items-center gap-2">
              {hasCreate && <CreateButton />}
            </div>
          </div>

          {((filters && filters.length > 0) || actions !== false) && (
            <div className="flex justify-between items-center flex-wrap gap-3 bg-card px-4 py-3 rounded-xl border border-border shadow-sm transition-all">
              <div className="flex-1 min-w-[280px]">
                <FilterForm className="m-0" />
              </div>
              <div className="flex items-center gap-2">
                {actions ?? (
                  <>
                    {filters && filters.length > 0 ? <FilterButton variant="ghost" size="sm" /> : null}
                    <ColumnsButton variant="ghost" size="sm" />
                    {exporter !== false && <ExportButton className="h-8" />}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6 items-start mt-4">
          <div className={cn("flex-1 min-w-0", className)}>
            {children}
            {pagination}
          </div>
          {aside && (
            <aside className="w-64 shrink-0 animate-in fade-in slide-in-from-right-4 duration-500">
              {aside}
            </aside>
          )}
        </div>
      </FilterContext.Provider>
    </>
  );
};

const defaultPagination = <ListPagination />;

export const Empty = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const getResourceLabel = useGetResourceLabel();
  const { hasCreate } = useResourceDefinition({ resource });
  if (!resource) {
    return null;
  }
  const resourceName = translate(`resources.${resource}.forcedCaseName`, {
    smart_count: 0,
    _: resource ? getResourceLabel(resource, 0) : undefined,
  });
  const emptyMessage = translate("ra.page.empty", { name: resourceName });
  const inviteMessage = translate("ra.page.invite");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-2xl font-semibold">
        {translate(`resources.${resource}.empty`, {
          _: emptyMessage,
        })}
      </h2>
      {hasCreate ? (
        <>
          <p className="text-muted-foreground">
            {translate(`resources.${resource}.invite`, {
              _: inviteMessage,
            })}
          </p>
          <CreateButton />
        </>
      ) : null}
    </div>
  );
};

export interface ListViewProps<RecordType extends RaRecord = RaRecord> {
  children?: ReactNode;
  disableBreadcrumb?: boolean;
  render?: (props: ListControllerResult<RecordType, Error>) => ReactNode;
  actions?: ReactElement | false;
  filters?: ReactNode[];
  pagination?: ReactNode;
  title?: ReactNode | string | false;
  aside?: ReactNode;
  className?: string;
  hasCreate?: boolean;
  exporter?: ListBaseProps<RecordType>["exporter"];
}
