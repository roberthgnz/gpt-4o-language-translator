import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TranslatorTypeTabsProps {
    defaultValue: string;
    tabsList: {
        key: string;
        name: string;
    }[];
    children: React.ReactNode;
}

export const TranslatorTypeTabs = ({ defaultValue, tabsList = [], children }: TranslatorTypeTabsProps) => {
    return <Tabs defaultValue={defaultValue}>
        <TabsList>
            {
                tabsList.map((tab, index) => {
                    return <TabsTrigger key={index} value={tab.key}>{tab.name}</TabsTrigger>
                })
            }
        </TabsList>
        {children}
    </Tabs>

}