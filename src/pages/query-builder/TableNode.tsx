import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  User, Layers, DollarSign, Star, Calendar, 
  BookOpen, CheckSquare, Database, Key, Filter, ArrowDownUp, Calculator,
  Package, ShoppingCart, FileText, Settings, Users, Mail, Tag
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { ParsedColumn } from '@/lib/query-engine';

const iconMap: Record<string, React.ElementType> = {
  user: User,
  users: Users,
  layers: Layers,
  'dollar-sign': DollarSign,
  star: Star,
  calendar: Calendar,
  'book-open': BookOpen,
  'check-square': CheckSquare,
  database: Database,
  package: Package,
  cart: ShoppingCart,
  'shopping-cart': ShoppingCart,
  file: FileText,
  settings: Settings,
  mail: Mail,
  tag: Tag,
};

interface TableNodeData {
  label: string;
  columns: ParsedColumn[];
  styles?: {
    color?: string;
    icon?: string;
  };
}

export default memo(function TableNode({ data }: NodeProps<TableNodeData>) {
  const Icon = iconMap[data.styles?.icon || 'database'] || Database;
  const headerColor = data.styles?.color || '#3b82f6';
  
  const handleAction = (e: React.MouseEvent, type: string, colName: string) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('column-action', { 
      detail: { type, table: data.label, column: colName, x: e.clientX, y: e.clientY } 
    }));
  };

  return (
    <div className="min-w-[280px] bg-card rounded-lg border border-border shadow-lg overflow-hidden font-mono text-sm animate-fade-in">
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center gap-3 border-b border-border bg-secondary/30"
        style={{ borderTop: `3px solid ${headerColor}` }}
      >
        <div 
          className="p-1.5 rounded-md bg-background/50 ring-1 ring-inset ring-border"
          style={{ color: headerColor }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-bold text-foreground tracking-tight">{data.label}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {data.columns.length} cols
        </span>
      </div>

      {/* Columns */}
      <div className="py-1 flex flex-col max-h-[400px] overflow-y-auto">
        {data.columns.map((col: ParsedColumn) => {
          const state = col.state || {} as NonNullable<ParsedColumn['state']>;
          const isSelected = state.selected ?? false;
          const hasModifiers = state.aggregate || state.sort || state.filter || state.having;

          return (
            <div 
              key={col.name} 
              className={cn(
                "group relative flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150",
                isSelected 
                  ? "bg-primary/10 border-l-2 border-l-primary" 
                  : "hover:bg-accent border-l-2 border-l-transparent"
              )}
              onClick={(e) => handleAction(e, 'toggle', col.name)}
              onContextMenu={(e) => { e.preventDefault(); handleAction(e, 'context', col.name); }}
            >
              <Handle 
                type="target" 
                position={Position.Left} 
                id={col.name} 
                className="!w-2 !h-2 !bg-muted-foreground !border-none opacity-0 group-hover:opacity-100 transition-opacity !-ml-[18px]" 
              />

              <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                {/* Selection Indicator */}
                <div className={cn(
                  "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-all duration-150",
                  isSelected 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground/40 group-hover:border-muted-foreground"
                )}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 2.28L4 8.56 1.72 6.28a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z"/>
                    </svg>
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "truncate transition-colors",
                      isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {col.name}
                    </span>
                    {col.isPk && (
                      <Key className="w-3 h-3 text-qb-join shrink-0" />
                    )}
                  </div>
                  
                  {/* State Badges */}
                  {hasModifiers && (
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      {state.aggregate && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-aggregate/20 text-qb-aggregate px-1.5 py-0.5 rounded font-medium">
                          <Calculator className="w-2.5 h-2.5" />
                          {state.aggregate}
                        </span>
                      )}
                      {state.sort && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-sort/20 text-qb-sort px-1.5 py-0.5 rounded font-medium">
                          <ArrowDownUp className="w-2.5 h-2.5" />
                          {state.sort}
                        </span>
                      )}
                      {state.filter && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-filter/20 text-qb-filter px-1.5 py-0.5 rounded font-medium">
                          <Filter className="w-2.5 h-2.5" />
                          WHERE
                        </span>
                      )}
                      {state.having && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-output/20 text-qb-output px-1.5 py-0.5 rounded font-medium">
                          <Filter className="w-2.5 h-2.5" />
                          HAVING
                        </span>
                      )}
                      {state.alias && (
                        <span className="inline-flex items-center text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-medium">
                          AS {state.alias}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[11px] text-muted-foreground font-medium shrink-0 ml-2 uppercase">
                {col.type}
              </span>
              
              <Handle 
                type="source" 
                position={Position.Right} 
                id={col.name} 
                className="!w-2 !h-2 !bg-muted-foreground !border-none opacity-0 group-hover:opacity-100 transition-opacity !-mr-[18px]" 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});