import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type MenuLink = {
    label: string,
    routerLink: string,
    icon: IconDefinition,
    permissions: string[],
    onClick?: (reference?: any) => void
  };
  
  type Menu = {
      permissions: string[],
      label: string,
      menu: MenuLink[]
  };