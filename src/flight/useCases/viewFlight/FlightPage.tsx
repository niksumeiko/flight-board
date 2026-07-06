import {
    ContentLayout,
    FormField,
    HeadingTitle,
    Layout,
    List,
    ListItem,
    Logo,
    Paragraph,
    Stripe,
} from '@design-system';
import { useQuery } from '@tanstack/react-query';
import { fetchClosestFlight } from '../../domain/FlightAdapter';
import { createFlightPageModel } from './FlightPageModelService.ts';

export const FlightPage = () => {
    const query = useQuery({
        queryKey: ['closest-flight'],
        queryFn: fetchClosestFlight,
    });
    const model = createFlightPageModel(query);

    if (model.state === 'LOADING') {
        return (
            <Layout>
                <Stripe>
                    <Logo variant="xl" />
                </Stripe>
                <ContentLayout>
                    <Paragraph>Loading...</Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    if (model.state === 'ERROR') {
        return (
            <Layout>
                <Stripe>
                    <Logo variant="xl" />
                </Stripe>
                <ContentLayout>
                    <Paragraph>
                        There is an error retrieving the closest flight.
                    </Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    return (
        <Layout>
            <Stripe>
                <Logo variant="xl" />
            </Stripe>
            <ContentLayout>
                <FormField label="Route">
                    <HeadingTitle level={1} indent>
                        {model.route}
                    </HeadingTitle>
                </FormField>
                <List>
                    <ListItem label="Airline" value={model.airline} />
                    <ListItem label="Date" value={model.date} />
                    <ListItem label="Times" value={model.times} />
                    <ListItem label="Duration" value={model.duration} />
                    <ListItem label="Stops" value={model.stopsLabel} />
                    <ListItem label="Price" value={model.price} />
                </List>
            </ContentLayout>
        </Layout>
    );
};
