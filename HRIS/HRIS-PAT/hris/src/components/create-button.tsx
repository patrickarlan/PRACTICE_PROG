import React, { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useCreatePath,
  useGetResourceLabel,
  useResourceContext,
  useResourceTranslation,
} from "ra-core";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

export type CreateButtonProps = {
  label?: string;
  resource?: string;
  className?: string;
  icon?: ReactNode;
  to?: string;
};

/**
 * A button that navigates to the create page for a resource.
 *
 * Automatically uses the current resource unless overridden.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/createbutton/ CreateButton documentation}
 *
 * @example
 * import { CreateButton, List, ExportButton } from '@/components/admin';
 *
 * const PostList = () => (
 *   <List
 *     actions={<>
 *       <CreateButton />
 *       <ExportButton />
 *     </>}
 *   >
 *     ...
 *   </List>
 * );
 */
export const CreateButton = (props: CreateButtonProps) => {
  const { label: labelProp, className, icon, to } = props;
  const resource = useResourceContext(props);
  const createPath = useCreatePath();
  const getResourceLabel = useGetResourceLabel();
  const link = to ?? createPath({
    resource,
    type: "create",
  });
  const label = useResourceTranslation({
    resourceI18nKey: resource
      ? `resources.${resource}.action.create`
      : undefined,
    baseI18nKey: "ra.action.create",
    options: {
      name: resource ? getResourceLabel(resource, 1) : undefined,
    },
    userText: labelProp,
  });
  return (
    <Link
      className={cn(buttonVariants({ variant: "outline" }), className)}
      to={link}
      onClick={stopPropagation}
      aria-label={typeof label === "string" ? label : undefined}
    >
      {icon ?? <Plus />}
      {label}
    </Link>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
